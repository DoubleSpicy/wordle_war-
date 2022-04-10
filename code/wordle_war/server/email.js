const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'csci3100wordle@gmail.com',
    pass: 'gfhksdgm' // naturally, replace both with your real credentials or an application-specific password
  }
});
/*
const mailOptions = {
  from: 'csci3100wordle@gmail.com',
  to: 'johnwong14793@gmail.com',
  subject: 'Email sent test',
  text: 'YOLO!'
};
*/
//this is to send email
/*
transporter.sendMail(mailOptions, function(error, info){
  if (error) {
	console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});
*/
module.exports=transporter;