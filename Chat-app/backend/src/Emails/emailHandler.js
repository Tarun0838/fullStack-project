import { resendClient, sender } from "../lib/resend.js"
import { createWelcomeEmailTemplate } from "./emailTemplate.js"

export const sendWelcomeEmail = async (name, email, clientURL) => {
    console.log(sender);
    console.log(`${sender.name} <${sender.email}>`);
    const { data, error } = await resendClient.emails.send({
        from: `${sender.name} <${sender.email}>`,
        to: email,
        subject: `Welcome to Tarun's Chat-App!`,
        html: createWelcomeEmailTemplate(name, clientURL)
    })

    if (error) {
        console.error("Error in sending Welcome emails:", error)
        // throw new Error("failed to send welcome email")
        throw error
    }
    else {
        console.log(`Welcome email send Successfully ${data}`)
    }
}