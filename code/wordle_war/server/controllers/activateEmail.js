const nodemailer = require('nodemailer');

function sendActivateEmail(email, user, hash) {
    console.log(email, user, hash);
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
        subject: 'Wordle - Activate Account',
        html: `
          <h3> Hello ${user} ${email}</h3>
          <p>Thank you for registering into our Application. Much Appreciated! Just one last step is laying ahead of you...</p>
          <p>To activate your account please follow this link: <a target="_" href="${process.env.DOMAIN}/activate/user/${hash}">${process.env.DOMAIN}/activate </a></p>
          <p>Cheers</p>
          <p>Your Application Team</p>
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

module.exports = { sendActivateEmail };