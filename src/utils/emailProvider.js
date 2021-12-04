const nodemailer = require("nodemailer");

const sendMail = async (options) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    port: process.env.EMAIL_PORT,
    host: process.env.EMAIL_HOST,
    auth: {
      user: "testguiemail2020@gmail.com",
      pass: "guimail123",
    },
    tls: {
      rejectUnauthorized: false,
    },
    secure: false,
  });
  const mailOptions = {
    from: "POLY CINEMA <testguiemail2020@gmail.com>",
    to: options.to,
    subject: options.subject,
    text: options.text,
    html: options.html,
  };
  await transporter.sendMail(mailOptions);
};

module.exports = sendMail;
