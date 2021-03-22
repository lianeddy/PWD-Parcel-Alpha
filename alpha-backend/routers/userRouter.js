const router = require("express").Router();
const query = require("../database");
const { userController } = require("../controllers");
// const { verifyToken,  createToken } = require("../helpers/jwtHelper");
const hashPassword = require("../helpers/hash");
const { verifyToken, checkToken } = require("../helpers/jwtHelper");
const { route } = require("./productRouter");

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
router.post("/change-pass/:id", (req, res) => {
  const { password } = req.body;

  // const userID = req.user.id;
  // console.log(userID);
  const editPassword = `UPDATE users SET password = '${hashPassword(
    password
  )}' WHERE id = ${req.params.id}`;
  // const editPassword = `UPDATE users set password =${password} where id = ${userID}`;
  query(editPassword, (err) => {
    if (err) return res.status(500).send(err.message);
    return res.status(200).send("Password has been updated");
  });
});

// router.post('/keepLogin', verifyToken, userController.keepLogin)
// router.post('/login', userController.login)

module.exports = router;
