const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail", // or "smtp" if using custom SMTP
  auth: {
    user: process.env.EMAIL_USER, // your email
    pass: process.env.EMAIL_PASS, // app password (not raw Gmail password)
  },
});

async function sendCommitteeMail(to, subject, html) {
  try {
    await transporter.sendMail({
      from: `"Medi-Caps University" <${process.env.EMAIL_USER}>`,
      to, // can be string or array of emails
      subject,
      html,
    });
    console.log(`✅ Email sent to: ${to}`);
  } catch (err) {
    console.error("❌ Error sending email:", err);
  }
}

module.exports = { sendCommitteeMail };
