// https://nodemailer.com
const nodemailer = require('nodemailer')

const auth = {
  user: '603803799@qq.com',
  pass: 'xurzskuzbtwxbfdf',
}

const transporter = nodemailer.createTransport({
  // service: 'hotmail',
  host: 'smtp.qq.com',
  port: 465,
  secure: true, // true for 465, false for other ports
  auth,
  secureConnection: true, // use SSL
})

const commonOption = {
  from: `石油化工 <${auth.user}>`,
  // to: 'receiver@sender.com',
  // subject: 'Message title',
  // text: 'Plaintext version of the message',
  // html: '<p>HTML version of the message</p>'
}

module.exports = option => {

  /*
  * @params option [https://nodemailer.com/message/]
  *
  *  from - The email address of the sender. All email addresses can be plain ‘sender@server.com’ or formatted ’“Sender Name” sender@server.com‘, see Address object for details
  *  to - Comma separated list or an array of recipients email addresses that will appear on the To: field
  *  cc - Comma separated list or an array of recipients email addresses that will appear on the Cc: field
  *  bcc - Comma separated list or an array of recipients email addresses that will appear on the Bcc: field
  *  subject - The subject of the email
  *  text - The plaintext version of the message as an Unicode string, Buffer, Stream or an attachment-like object ({path: ‘/var/data/…’})
  *  html - The HTML version of the message as an Unicode string, Buffer, Stream or an attachment-like object ({path: ‘http://…‘})
  *  attachments - An array of attachment objects (see Using attachments for details). Attachments can be used for embedding images as well.
  * */

  return new Promise(function (resolve, reject) {
    transporter.sendMail({...commonOption, ...option},
      (error, info) => {
        if (error) {
          reject({error})
          console.error(`Send email to ${option.to} failed!\n`)
        } else {
          console.log(`Send email to ${option.to} success!\n`)
          resolve({info})
        }
        transporter.close()
      })
  })
}
