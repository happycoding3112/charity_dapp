const nodemailer = require("nodemailer");

module.exports = async (email, subject, text, html) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      host: process.env.HOST,
      port: Number(process.env.EMAIL_PORT),
      secure: Boolean(process.env.SECURE),
      auth: {
        user: process.env.USER,
        pass: process.env.PASS,
      },
      from: process.env.USER,
    });

    await transporter.sendMail({
      from: process.env.USER,
      to: email,
      subject: subject,
      text: text,
      html: html,
    });
    console.log("email sent successfully");
  } catch (error) {
    console.log("email not sent!");
    console.log(error);
    return error;
  }
};
