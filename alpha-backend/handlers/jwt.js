const jwt = require("jsonwebtoken");

const createJWTToken = (payload) => {
  return jwt.sign(payload, "bakaneko");
};
const checkToken = (req, res, next) => {
  if (req.method !== "OPTIONS") {
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
