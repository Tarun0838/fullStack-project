import nodemailer from 'nodemailer'



const transporter = nodemailer.createTransport({
  host: "GMAIL",
  port: 465,
  secure: true, // use STARTTLS (upgrade connection to TLS after connecting)
  auth: {
    user: process.env.MAIL,
    pass: process.env.MAIL_PASSWORD,
  },
});