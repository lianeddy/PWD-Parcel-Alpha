const nodemailer = require("nodemailer");
const util = require("util");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "bayuferdiman1@gmail.com",
    pass: "uzbekihistan",
  },
});

const transportPromise = util.promisify(transporter.sendMail).bind(transporter);

module.exports = { transporter, transportPromise };
