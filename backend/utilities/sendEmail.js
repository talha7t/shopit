const nodemailer = require("nodemailer");

const sendEmail = async (options) => {
  const transporter = nodemailer.createTransport({
    // host: process.env.SMTP_HOST,
    // port: process.env.SMTP_PORT,
    service: "Gmail",
    auth: {
      user: process.env.SMTP_EMAIL,
      pass: process.env.SMTP_PASSWORD,
    },
  });

  const message = {
    from: options.email
      ? options.email
      : `${process.env.SMTP_FROM_EMAIL} <${process.env.SMTP_FROM_EMAIL}>`,
    to:
      options.to === "jtalha620@gmail.com"
        ? "jtalha620@gmail.com"
        : options.email,
    subject: options.subject,
    text: options.message,
  };
  console.log(message);

  await transporter.sendMail(message);
};

module.exports = sendEmail;
