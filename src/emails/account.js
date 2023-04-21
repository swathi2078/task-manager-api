const nodemailer = require('nodemailer')
 
function transporter() {
    return nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'testmailid876@gmail.com',  // Your email address
            pass: process.env.APP_PASSWORD  // Your password (or special app password)
        }
    })
}
 
function sendWelcomeEmail(email, name) {
    const transporterObject = transporter()
    transporterObject.sendMail({
        from: 'Task Manager API <testmailid876@gmail.com>',
        to: email,
        subject: 'Thanks for joining!',
        text: `Welcome to our service, ${name}!`,
        html: `<b>Welcome to our service, ${name}!</b>`
    })
}
 
function sendDeleteEmail(email, name) {
    const transporterObject = transporter()
    transporterObject.sendMail({
        from: 'Task Manager API <testmailid876@gmail.com>',
        to: email,
        subject: 'We\'re sorry to see you leave',
        text: `We hope to see you back again someday, ${name}!`,
        html: `<b>We hope to see you back again someday, ${name}!</b>`
    })
}
 
module.exports = {
    sendWelcomeEmail,
    sendDeleteEmail
}