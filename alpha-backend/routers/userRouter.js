const router = require("express").Router();
const query = require("../database");

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

router.post("/change-pass",checkToken ,(req, res) => {
  const { password } = req.body;

  const userID = req.user.id;
  // console.log(userID);
  const editPassword = `UPDATE users SET password = '${hashPassword(
    password
  )}' WHERE id = ${userID}`;
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

router.get("/", async (req, res) => {
  let { email } = req.body;
  try {
    const isRegistered = await query(
      `SELECT id FROM users WHERE email = '${email}'`
    );
    res.status(200).send(isRegistered[0]);
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});

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
      html: `<h3>Welcome to Wanderlust, ${username}!</h3><br><h4>Please click link below to verify your account.</h4><br><a href="http://localhost:3000/verify?username=${username}&password=${password}">Verify Account</a>`,
    };
    await transportPromise(sendMail);
    const registeredUser = await query(
      `SELECT id, username, email, roleID, verified FROM users WHERE id = ${registerUser.insertId}`
    );
    const responseData = { ...registeredUser[0] };
    responseData.token = createJWTToken(responseData);
    return res.status(200).send(responseData);
  } catch (err) {
    res.status(500).send({ error: err.message.responseData.error });
  }
});

router.post("/email-verification", (req, res) => {
  const { username, password } = req.body;
  const get = `SELECT id FROM users WHERE username = '${username}' AND password = '${password}'`;
  query(get, (err, data) => {
    console.log(JSON.stringify(data[0].id));
    if (err) res.status(500).send(err);
    const idUser = JSON.stringify(data[0].id);
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
