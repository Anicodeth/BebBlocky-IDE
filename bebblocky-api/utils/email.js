// utils/email.js
const nodemailer = require('nodemailer');

module.exports = async (email, code) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail', host: 'smtp.gmail.com',
        auth: {
            user: 'email@email.com',
            pass: 'password',
        },
    });

    const mailOptions = {
        from: 'email.email.com',
        to: email,
        subject: 'BeBlocky New Account',
        html: `<p>Welcome to BeBlocky, Inc. You have recently tried to create an account. Here is your verification code:
           ${code}</p>`,
    };

    await transporter.sendMail(mailOptions);
}
