const router = require("express").Router();
const query = require("../database");
const { userController } = require("../controllers");
// const { verifyToken,  createToken } = require("../helpers/jwtHelper");
// const hashPassword = require("../helpers/hash");
// const { verifyToken, checkToken } = require("../helpers/jwtHelper");
const { route } = require("./productRouter");
const {
  transporter,
  transportPromise,
  createJWTToken,
  hashPassword,
  checkToken,
} = require("../handlers");
// hash password ada dua
const { registerValidator } = require("../middleware");

//Get ALL
router.get("/all", (req, res) => {
  let sql = `select * from users`;
  query(sql, (err, data) => {
    if (err) {
      return res.status(400).send(err.message);
    }
    return res.status(200).send(data);
  });
});

// Change Password
// Checktoken blum ditambahkan di parameter ke 2
// req.paramnya nanti diubah sama req.user.id
// karena masih belum ada token
// params :id nanti dihapus saja
router.post("/change-pass",checkToken ,(req, res) => {
  const { password } = req.body;

  const userID = req.user.id;
  // console.log(userID);
  const editPassword = `UPDATE users SET password = '${hashPassword(
    password
  )}' WHERE id = ${userID}`;
  // const editPassword = `UPDATE users set password =${password} where id = ${userID}`;
  query(editPassword, (err) => {
    if (err) return res.status(500).send(err.message);
    return res.status(200).send("Password has been updated");
  });
});

// router.post('/keepLogin', verifyToken, userController.keepLogin)
// router.post('/login', userController.login)
router.post("/login", (req, res) => {
  const { username, password } = req.body;
  let sql = `
    SELECT 
        id, 
        username, 
        email, 
        roleID, 
        verified 
    FROM users WHERE username = '${username}' AND password = '${hashPassword(
    password
  )}'`;
  query(sql, (err, data) => {
    if (err) {
      return res.status(500).send(err);
    }
    if (data.length === 0) {
      return res.status(404).send({
        message: "User Not Found",
        status: "Not Found",
      });
    } else {
      const responseData = { ...data[0] };
      const token = createJWTToken(responseData);
      responseData.token = token;
      return res.status(200).send(responseData);
    }
  });
});


router.post("/keep-login", checkToken, (req, res) => {
  let sql = `
    SELECT 
        id, 
        username, 
        email,  
        roleID, 
        verified 
    FROM users WHERE id = ${req.user.id}`;
  query(sql, (err, data) => {
    if (err) {
      return res.status(500).send(err);
    }
    return res.status(200).send(data[0]);
  });
});


// router.post("/keepLogin", verifyToken, userController.keepLogin);
// router.post("/login", userController.login);

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
