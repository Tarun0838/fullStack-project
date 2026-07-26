import nodemailer from 'nodemailer'
import dotenv from 'dotenv'

dotenv.config();



const transporter = nodemailer.createTransport({

    
  host: "smtp.gmail.com",
  port: 465,
  secure: true, // use STARTTLS (upgrade connection to TLS after connecting)
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD,
  },
});


const sendMail = async (to , otp) => {
    await transporter.sendMail({
        from: `${process.env.EMAIL}`,
        to: to,
        subject: "Reset Your Password",
        html: `<p> Your  otp for password Reset is <b> ${otp}</b>. It expires in 5 minutes. `
})

}

export default sendMail;