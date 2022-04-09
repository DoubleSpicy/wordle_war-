const usersDB = {
    users: require('../model/users.json'),
    setUsers: function (data) { this.users = data }
}
const pendingUsersDB = {
    users: require('../model/pending-users.json'),
    setUsers: function (data) { this.users = data }
}
const resetPasswordDB = {
    users: require('../model/resetPassword.json'),
    setUsers: function (data) { this.users = data }
}

const { sendConfirmationEmail, sendResetPasswordEmail } = require('./sendEmail');
const fsPromises = require('fs').promises;
const path = require('path');
const bcrypt = require('bcrypt');


const handleReset = async (req, res) => {
    const { email } = req.body;
    try {
        console.log(email)
        const user = usersDB.users.find(person => person.email === email);
        if (!user) { return res.status(422).send('User email not found!'); }

        resetPasswordDB.setUsers([...resetPasswordDB.users, user]);
        await fsPromises.writeFile(
            path.join(__dirname, '..', 'model', 'resetPassword.json'),
            JSON.stringify(resetPasswordDB.users)
        );

        // await sendResetPasswordEmail({ toUser: user, hash: hash._id });
        return res.json({ message: 'Please check your email to reset the password!' })

    } catch (err) {
        res.status(500).json({ 'message': err.message });
    }
}

module.exports = { handleReset };