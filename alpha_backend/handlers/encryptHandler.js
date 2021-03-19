// Hash Password

const Crypto = require("crypto");
const hashPassword = (payload) => {
  return Crypto.createHmac("sha256", "hashKey").update(payload).digest("hex");
};

module.exports = hashPassword;
