const Crypto = require("crypto");
const hashPassword = (pass) => {
  return Crypto.createHmac("sha256", "hashKey").update(pass).digest("hex");
};

module.exports = hashPassword;