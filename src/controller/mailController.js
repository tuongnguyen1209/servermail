const sendMail = require("../utils/emailProvider");

exports.sendmail = async (req, res) => {
  const { email, subject, text } = req.body;
  try {
    const options = {
      to: email,
      subject: subject,
      text: text,
    };
    await sendMail(options);
    res.status(200).json({
      status: "Success",
      message: "Gửi thành công",
    });
  } catch (error) {
    res.status(400).json({
      status: "False",
      message: "Gửi mail thất bại, vui lòng kiểm tra lại",
      error: error.message,
    });
  }
};
