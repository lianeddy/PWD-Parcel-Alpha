const emailValidator = require("./emailValidator");
const passwordValidator = require("./passwordValidator");
const query = require("../database");

const registerValidator = async (req, res, next) => {
  const { username, email, password } = req.body;
  if (username.length < 4) {
    return res
      .status(401)
      .send({ error: "Username has to be at least 4 character" });
  }
  if (!emailValidator(email)) {
    return res.status(401).send({ error: "Email is not valid" });
  }
  if (!passwordValidator(password)) {
    return res.status(401).send({
      error:
        "Password has to be at least 6 characters, contains number and special character",
    });
  }
  try {
    const mailAvail = await query(
      `SELECT id FROM users WHERE email = '${email}'`
    );
    if (mailAvail.length > 0) {
      return res.status(401).send({ error: "Email has been registered." });
    }
    next();
  } catch (err) {
    res.status(500).send(err);
  }
};

module.exports = registerValidator;
