const { Hash } = require('crypto');
const nodemailer = require('nodemailer');


function adminResetAccountEmail(email, user, pw) {
    console.log(email, user, pw);
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'csci3100wordle@gmail.com',
            pass: 'gfhksdgm' // naturally, replace both with your real credentials or an application-specific password
        }
    });


    const mailOptions = {
        from: 'csci3100wordle@gmail.com',
        to: '2022csci3100@gmail.com',
        subject: 'Wordle - reseted password',
        html: `
          <h3> Hello ${user} ${email}</h3>
          <p>Change your Wordle Account password.</p>
          <p>your email reset to "${pw}"</p>
          <p>Cheers</p>
          <p>Wordle Team</p>
          `
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
    console.log({ 'success': `New user ${user} send email!` });

}

module.exports = { adminResetAccountEmail };