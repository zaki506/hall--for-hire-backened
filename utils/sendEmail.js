const nodemailer = require("nodemailer");
require("dotenv").config();

const sendEmail = (email, subject, text) => {
  let mailTransporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_USER_PASS,
    },
    post:Number(process.env.EMAIL_PORT),
    secure:Boolean(process.env.SECURE)
  });

  let mailDetails = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: subject,
    text: text
  };

  mailTransporter.sendMail(mailDetails, function (err, data) {
    if (err) {
      console.log("error occurred", err.message);
    } else {
      console.log(" ----- Email sent successfully -----");
    }
  });
};

module.exports = {
  sendEmail,
};
