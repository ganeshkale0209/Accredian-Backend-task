const nodemailer = require("nodemailer");

const sendReferralEmail = async (toEmail, referrerName) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "ganeshkale0209@gmail.com", // 🔹 Replace with your Gmail
        pass: "ovhu vwng bsxp oshk", // 🔹 Replace with the App Password
      },
    });

    const mailOptions = {
      from: "your-email@gmail.com",
      to: toEmail,
      subject: "Referral Confirmation",
      text: `Hello! ${referrerName} has referred you. Check it out!`,
    };

    await transporter.sendMail(mailOptions);
    console.log("✅ Referral Email Sent to", toEmail);
  } catch (error) {
    console.error("❌ Email Sending Error:", error);
  }
};

module.exports = sendReferralEmail;
