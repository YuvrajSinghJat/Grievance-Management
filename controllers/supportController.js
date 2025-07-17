const nodemailer = require("nodemailer");

const handleSupportForm = async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: "All fields are required." });
  }

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: `"Grievance Support" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER, // ✅ Sending to eventify itself
      subject: `New Support Message from ${name}`,
      html: `
        <h3>Support Request</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    };

    await transporter.sendMail(mailOptions);
    return res.status(200).json({ message: "Support email sent successfully." });

  } catch (error) {
    console.error("❌ Email sending failed:", error);
    return res.status(500).json({ error: "Failed to send email." });
  }
};

module.exports = { handleSupportForm };
