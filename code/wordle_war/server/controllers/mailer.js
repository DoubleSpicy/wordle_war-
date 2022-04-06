//https://cythilya.github.io/2015/08/19/node-nodemailer/
const nodemailer = require('nodemailer');
//https://nodemailer.com/about/

// function sendEmail(message) {

//   return new Promise((res, rej) => {
//     const transporter = nodemailer.createTransport({
//       service: 'gmail',
//       auth: {
//         user: process.env.GOOGLE_USER,
//         pass: process.env.GOOGLE_PASSWORD
//       }
//     })

//     transporter.sendMail(message, function (err, info) {
//       console.log("foin");
//       if (err) {
//         console.log("rej");
//         rej(err);
//       } else {
//         console.log("inf");
//         res(info);
//       }
//     })
//   })
// }

exports.sendConfirmationEmail = function ({ toUser, hash }) {

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: "2022csci3100@gmail.com",
        pass: "Csci3100n2022"
    }
  });
  const message = {
    from: "2022csci3100@gmail.com",
    // to: toUser.email // in production uncomment this
    to:"2022csci3100@gmail.com",
    subject: 'Your App - Activate Account',
    html: `
      <h3> Hello ${toUser.username} </h3>
      <p>Thank you for registering into our Application. Much Appreciated! Just one last step is laying ahead of you...</p>
      <p>To activate your account please follow this link: <a target="_" href="${process.env.DOMAIN}/api/activate/user/${hash}">${process.env.DOMAIN}/activate </a></p>
      <p>Cheers</p>
      <p>Your Application Team</p>
    `
  }
  transporter.sendMail(message, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
  // return sendEmail(message);
}

exports.sendResetPasswordEmail = ({ toUser, hash }) => {
  const message = {
    from: process.env.GOOGLE_USER,
    // to: toUser.email // in production uncomment this
    to: process.env.GOOGLE_USER,
    subject: 'Your App - Reset Password',
    html: `
      <h3>Hello ${toUser.username} </h3>
      <p>To reset your password please follow this link: <a target="_" href="${process.env.DOMAIN}/reset-password/${hash}">Reset Password Link</a></p>
      <p>Cheers,</p>
      <p>Your Application Team</p>
    `
  }

  // return sendEmail(message);
}