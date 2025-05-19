// services/emailService.ts
import nodemailer from 'nodemailer';

// Create the transporter using Mailtrap SMTP credentials
const transporter = nodemailer.createTransport({
    host: 'smtp.mailtrap.io',
    port: 2525,
    auth: {
        user: 'aba085d94f883b', // Replace with your Mailtrap username
        pass: '29c678feaef6cd', // Replace with your Mailtrap password
    },
});

// Function to send email with doctor’s credentials
export const sendEmail = async (options:any) => {
    try {
        const {fromEmail, toEmail, subject, body } = options;
        const mailOptions = {
            from: fromEmail, // Sender's email
            to: toEmail, // Recipient's email (Doctor's email)
            subject: subject,
            text:body
        };

        const info = await transporter.sendMail(mailOptions);
        console.log('Message sent: %s', info.messageId);
        return true; // Email sent successfully
    } catch (error) {
        console.error('Error sending email:', error);
        return false; // Error sending email
    }
};
 