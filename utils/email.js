const nodemailer = require('nodemailer');

exports.sendMail = async (topic, message, recipient) => {

  try{
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.MAIL,
        pass: process.env.PASS
      }
    })

    const mailOptions = {
      from: process.env.MAIL,
      to: recipient,
      subject: topic,
      text: message
    }

    await transporter.sendMail(mailOptions)
  } catch(err){
    console.log(err)
  }
}
