const User = require('../model/User');
const resetAccount = require('../model/resetAccount');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const handleConfirm = async (req, res) => {
    const { pwd, hash } = req.body;
    try {
         const aHash = await resetAccount.findOne({ _id: hash }).exec();
        if (!aHash) {
            return res.status(422).send('Cannot reset a password!');
        }
        //del resetPasswordDB
        await resetAccount.deleteOne({ _id: hash});

        //update user 
        const hashedPwd = await bcrypt.hash(pwd, 10);
        const pwUpdate = await User.update({_id: hash}, {password: hashedPwd});

        return res.json({ message: 'Password has been reseted!' });

    } catch (err) {
        res.status(500).json({ 'message': err.message });
    }
}

module.exports = { handleConfirm };


// const usersDB = {
//     users: require('../model/users.json'),
//     setUsers: function (data) { this.users = data }
// }
// const pendingUsersDB = {
//     users: require('../model/pending-users.json'),
//     setUsers: function (data) { this.users = data }
// }
// const resetPasswordDB = {
//     users: require('../model/resetPassword.json'),
//     setUsers: function (data) { this.users = data }
// }

// const { sendConfirmationEmail, sendResetPasswordEmail } = require('./sendEmail');
// const fsPromises = require('fs').promises;
// const path = require('path');
// const bcrypt = require('bcrypt');


// const handleConfirm = async (req, res) => {
//     const { pwd, hash } = req.body;
//     try {
//         const aHash = resetPasswordDB.users.find(person => person.id === hash);
//         if (!aHash) {
//             return res.status(422).send('Cannot reset a password!');
//         }
//         //del resetPasswordDB
//         const index = resetPasswordDB.users.findIndex(a => a.id === hash)
//         const test = resetPasswordDB.users[index];
//         const tmp = resetPasswordDB.users.splice(index, 1);
//         await fsPromises.writeFile(
//             path.join(__dirname, '..', 'model', 'resetPassword.json'),
//             JSON.stringify(resetPasswordDB.users, null, 2)
//         );

//         //del userDB
//         const index1 = usersDB.users.findIndex(a => a.id === hash)
//         const tmp2 = usersDB.users.splice(index1, 1);
//         await fsPromises.writeFile(
//             path.join(__dirname, '..', 'model', 'usersDB.json'),
//             JSON.stringify(usersDB.users, null, 2)
//         );


//         //update user 
//         const hashedPwd = await bcrypt.hash(pwd, 10);
//         test.password = hashedPwd;
//         usersDB.setUsers([...usersDB.users, test]);
//         await fsPromises.writeFile(
//             path.join(__dirname, '..', 'model', 'users.json'),
//             JSON.stringify(usersDB.users)
//         );

//         return res.json({ message: 'Password has been reseted!' });

//     } catch (err) {
//         res.status(500).json({ 'message': err.message });
//     }
// }

// module.exports = { handleConfirm };