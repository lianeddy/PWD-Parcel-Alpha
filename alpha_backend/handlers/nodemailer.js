const nodemailer = require("nodemailer");
const util = require("util");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "sinthadf@gmail.com",
    pass: "rgsgtlwbpgnzjzva",
  },
});

const transportPromise = util.promisify(transporter.sendMail).bind(transporter);

module.exports = { transporter, transportPromise };
