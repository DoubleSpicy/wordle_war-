
const User = require('../model/User');
const bcrypt = require('bcrypt');

// {email: 'asdasd@gmai.com', user: 'user', pwd: '@Aa1234', oldPwd: '@Aa123'}
const handleChangePassword = async (req, res) => {
    const { email, user, pwd, oldPwd } = req.body;
    console.log(email, user, pwd, oldPwd);
    if (!email || !user || !pwd || !oldPwd) return res.status(400).json({ 'message': 'Username and password and new password are required.' });

    // check usernames in the db

    const checkUserExist = await User.findOne({ email: email }).exec();
    if (!checkUserExist) return res.status(409).send("user do not exist");
    //check user old pw 
    const match = await bcrypt.compare(oldPwd, checkUserExist.password);
    if (!match) { res.status(400).json({ 'message': 'wrong old password.' }); }
    try {
        //encrypt the password


        //create and store the new user
        const hashedPwd = await bcrypt.hash(pwd, 10);
        const pwUpdate = await User.update({ _id: checkUserExist._id }, { password: pwd });

        return res.json({ message: 'Password has been reseted!' });

    } catch (err) {
        res.status(500).json({ 'message': err.message });
    }
}

module.exports = { handleChangePassword };
