import 'dotenv/config';

import nodemailer from 'nodemailer';

export default async function sendConfirmationEmail(email: string, token: string) {
    const transporter = nodemailer.createTransport({
        service: 'SendGrid',
        auth: {
            user: 'apikey',
            pass: process.env.SENDGRID_API_KEY  // A API Key que você obteve
        }
    });

    const mailOptions = {
        from: 'you@yourdomain.com', // Seu e-mail verificado no SendGrid
        to: email,
        subject: 'Confirm your registration',
        text: `Please confirm your registration by clicking the following link: http://localhost:3000/confirm/${token}`
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log(`Confirmation email sent to ${email}`);
    } catch (error) {
        console.error(`Failed to send confirmation email to ${email}:`, error);
        throw new Error('Failed to send confirmation email');
    }
}
