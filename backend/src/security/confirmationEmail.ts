import 'dotenv/config';
import nodemailer from 'nodemailer';
const PORT = process.env.PORT

export default async function sendConfirmationEmail(email: string, token: string) {
    const transporter = nodemailer.createTransport({
        host: 'smtp.zoho.com',
        port: 587,
        secure: false,
        auth: {
            user: process.env.ZOHO_USER,
            pass: process.env.ZOHO_PASS
        }
    });

    const mailOptions = {
        from: 'greenthumbhub@zohomail.com',
        to: email,
        subject: 'Confirm your registration',
        text: `Please confirm your registration by clicking the following link: http://localhost:${PORT}/confirm/${token}`
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log(`Confirmation email sent to ${email}`);
    } catch (error) {
        console.error(`Failed to send confirmation email to ${email}:`, error);
        throw new Error('Failed to send confirmation email');
    }
}
