const nodemailer = require("nodemailer");

const sendMail = async (options) => {
  const mailHost = "smtp.gmail.com";
  const mailPort = 587;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    port: mailPort,
    host: mailHost,
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
