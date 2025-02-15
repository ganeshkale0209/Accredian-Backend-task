const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS }
});

exports.sendReferralEmail = async (referrerEmail, refereeEmail, course) => {
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: refereeEmail,
        subject: 'You have been referred!',
        text: `${referrerEmail} has referred you to the course: ${course}.`
    };
    await transporter.sendMail(mailOptions);
};
