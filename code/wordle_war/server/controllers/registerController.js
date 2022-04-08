const usersDB = {
    users: require('../model/users.json'),
    setUsers: function (data) { this.users = data }
}
const pendingUsersDB = {
    users: require('../model/pending-users.json'),
    setUsers: function (data) { this.users = data }
}

const { sendConfirmationEmail, sendResetPasswordEmail } = require('./mailer');
const fsPromises = require('fs').promises;
const path = require('path');
const bcrypt = require('bcrypt');


const handleNewUser = async (req, res) => {
    const { email, user, pwd } = req.body;
    if (!email || !user || !pwd) return res.status(400).json({ 'message': 'Username and password are required.' });

    const duplicate = usersDB.users.find(person => person.email === email);
    const duplicate_user = usersDB.users.find(person => person.username === user);
    const duplicate_panding = pendingUsersDB.users.find(person => person.email === email);

    if (duplicate_panding || duplicate_user || duplicate) { return res.status(422).send('User is already registered!'); }


    try {

        //encrypt the password
        const hashedPwd = await bcrypt.hash(pwd, 10);
        //make user id
        const gen_id = '_' + Math.random().toString(36).substr(2, 9);
        //store the new user
        const newUser = { "id": gen_id, "email": email, "username": user, "password": hashedPwd };
        pendingUsersDB.setUsers([...pendingUsersDB.users, newUser])

        // usersDB.setUsers([...usersDB.users, newUser]);
        // await fsPromises.writeFile(
        //     path.join(__dirname, '..', 'model', 'users.json'),
        //     JSON.stringify(usersDB.users)
        // );
        await fsPromises.writeFile(
            path.join(__dirname, '..', 'model', 'pending-users.json'),
            JSON.stringify(pendingUsersDB.users)
        );
        // console.log(usersDB.users);
        console.log(pendingUsersDB.users);

        res.status(201).json({ 'success': `New user ${user} created! ${email}` });
        //send email to user
        await sendConfirmationEmail({ toUser: newUser, hash: newUser._id });

    
    } catch (err) {
        res.status(500).json({ 'message': err.message });
    }
}

module.exports = { handleNewUser };