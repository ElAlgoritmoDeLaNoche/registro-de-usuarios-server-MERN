const nodemailer = require('nodemailer')

module.exports = async (email, subject, text) => {
  try {

    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      service: 'gmail',
      port: '587',
      secure: true,
      auth: {
        user: 'mixmelo108@gmail.com',
        pass: 'ooonwckiudshhzhj',
      },
    })

    await transporter.sendMail({
      from: 'mixmelo108@gmail.com',
      to: email,
      subject: subject,
      text: text,
    })

    console.log('email sent successfully')
  } catch (error) {
    console.log('email not sent!')
    console.log(error)
    return error
  }
}
