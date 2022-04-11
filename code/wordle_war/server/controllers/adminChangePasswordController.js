const User = require('../model/User');
const bcrypt = require('bcrypt');
const { adminResetAccountEmail } = require('./adminResetPasswordEmail');

// {email: 'asdasd@gmai.com', user: 'user', pwd: '@Aa1234', oldPwd: '@Aa123'}
const handleChangePassword = async (req, res) => {
    //userEmail == _id
    const { userEmail, userPw } = req.body;
    console.log(userEmail, userPw );
    if (!userEmail || !userPw ) return res.status(400).json({ 'message': 'Username and password and new password are required.' });

    // check usernames in the db

    const checkUserExist = await User.findOne({ _id: userEmail }).exec();
    if (!checkUserExist) return res.status(409).send("user do not exist");
    //check user old pw 
    console.log(checkUserExist.email);
    try {
        //send email to user 
        await adminResetAccountEmail(checkUserExist.email, checkUserExist.username, userPw);
        const hashedPwd = await bcrypt.hash(userPw, 10);
        const pwUpdate = await User.update({ _id: checkUserExist._id }, { password: hashedPwd });
        return res.json({ message: 'Password has been reseted!' });

    } catch (err) {
        res.status(500).json({ 'message': err.message });
    }
}

module.exports = { handleChangePassword };


