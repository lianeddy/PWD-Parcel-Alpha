const router = require("express").Router();
const query = require("../database");
const {
  transporter,
  transportPromise,
  createJWTToken,
  hashPassword,
  checkToken,
} = require("../handlers");
const { registerValidator } = require("../middleware");

router.post("/register", registerValidator, async (req, res) => {
  let { username, email, password } = req.body;
  password = hashPassword(password);
  try {
    const registerUser = await query(
      `INSERT INTO users (username, email, password, roleID, verified) VALUES ('${username}', '${email}', '${password}', 2, 2)`
    );
    const sendMail = {
      from: "Admin <sinthadf@gmail.com>",
      to: email,
      subject: "Welcome greeting",
      html: `<h3>Welcome to Parcel Alpha, ${username}!</h3><br><h4>Please click link below to verify your account.</h4><br><a href="http://localhost:3000/verify?username=${username}&password=${password}">Verify Account</a>`,
    };
    await transportPromise(sendMail);
    const registeredUser = await query(
      `SELECT id, username, email, roleID, verified FROM users WHERE id = ${registerUser.insertId}`
    );
    const responseData = { ...registeredUser[0] };
    responseData.token = createJWTToken(responseData);
    return res.status(200).send(responseData);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

router.post("/email-verification", (req, res) => {
  const { username, password } = req.body;
  const get = `SELECT id FROM users WHERE username = '${username}' AND password = '${password}'`;
  query(get, (err, data) => {
    if (err) res.status(500).send(err);
    const idUser = data[0].id;
    const edit = `UPDATE users SET verified = 1 WHERE id = ${idUser}`;
    query(edit, (err) => {
      if (err) return res.status(500).send(err);
      const login = `SELECT id, username, email, roleID, verified FROM users WHERE id = ${idUser}`;
      query(login, (err, result) => {
        if (err) return res.status(500).send(err);
        const responseData = { ...result[0] };
        const token = createJWTToken(responseData);
        responseData.token = token;
        return res.status(200).send(responseData);
      });
    });
  });
});

module.exports = router;
