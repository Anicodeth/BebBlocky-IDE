// utils/email.js
const nodemailer = require('nodemailer');

async function sendVerificationEmail(email, code) {
    const transporter = nodemailer.createTransport({
        // Replace these with your email service provider settings
        service: 'Gmail',
        auth: {
            user: 'email@email.com',
            pass: 'email_password',
        },
    });

    const mailOptions = {
        from: 'your_email@gmail.com',
        to: email,
        subject: 'Email Verification',
        html: `<p>Welcome to BeBlocky, Inc. You have recently tried to create an account. Here is your verification code:
           ${code}</p>`,
    };

    await transporter.sendMail(mailOptions);
}

module.exports = { sendVerificationEmail };
