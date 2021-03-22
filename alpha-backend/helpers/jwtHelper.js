const jwt = require("jsonwebtoken");

// kalau mau makai token, kuncirahasianya disamakan
module.exports = {
  createToken: (data) => {
    return jwt.sign(data, "!@#$%^&*");
  },
  verifyToken: (req, res, next) => {
    const token = req.body.token;
    if (!token) return res.status(400).send("no token");
    try {
      const result = jwt.verify(token, "!@#$%^&*");
      req.user = result;
      next();
      // console.log(token);
      // console.log(result);
    } catch (err) {
      console.log(err);
      res.status(400).send(err);
    }
  },
  checkToken: (req, res, next) => {
    if (req.method !== "OPTIONS") {
      jwt.verify(req.token, "!@#$%^&*", (err, decoded) => {
        if (err) {
          return res.status(401).send({
            message: err.message,
            status: "Unauthorized",
          });
        }
        req.user = decoded; // 
        next();
      });
    }
  },
};
