const nodemailer = require("nodemailer");
module.exports.sendMail = async (email, otp) => {
    // Create a transporter for SMTP
    try {
        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port:587,
            secure: false, // upgrade later with STARTTLS
            auth: {
            user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
        },
        });
        const info = await transporter.sendMail({
            from: `"Xác thực OTP" <${process.env.SMTP_USER}>`,
            to: email,
            subject: 'Mã xác thực OTP',
            html: `<p>Mã OTP của bạn là: <b>${otp}</b></p><p>Mã có hiệu lực trong 3 phút.</p>`
            });
        console.log('✅ Email đã được gửi:', info.response);
        return true;
    }
    catch (error) {
        console.error('❌ Lỗi gửi email:', error);
        return false;
    }
}