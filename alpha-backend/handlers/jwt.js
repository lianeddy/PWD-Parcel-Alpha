const jwt = require("jsonwebtoken");

const createJWTToken = (payload) => {
  return jwt.sign(payload, "bakaneko", {
    expiresIn: "12h",
  });
};
const checkToken = (req, res, next) => {
  if (req.method !== "OPTIONS") {
    // console.log(req.token);
    jwt.verify(req.token, "bakaneko", (err, decoded) => {
      if (err) {
        return res.status(401).send({
          message: err.message,
          status: "Unauthorized",
        });
      }

      req.user = decoded;
      next();
    });
  }
};

module.exports = {
  createJWTToken,
  checkToken,
};
