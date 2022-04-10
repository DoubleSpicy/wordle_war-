const pendingUser = require('../model/pending-users');
const User = require('../model/User');
const bcrypt = require('bcrypt');


const handleActivate = async (req, res) => {
    const { hash } = req.params;

    try {
        const foundUser = await pendingUser.findOne({ _id: hash }).exec();
        if (!foundUser) return res.status(409).send("you have already activate"); //Conflict
        // console.log("foundUser.email", foundUser.email);
        // console.log("log file", foundUser);
        await pendingUser.deleteOne({ _id: hash}); // delete
     
     
        //create to user
        try {
            const move2User = await User.create({_id: hash,
                            email: foundUser.email,
                            password: foundUser.password,
                            username : foundUser.username});
            await move2User.save();
            // return res.status(201).json(move2User);
            return res.status(201).json({ 'success': `welcome ${foundUser.username} avtivate!` });
        } catch (err) {
            console.error(err);
        }

        
        return res.status(201).json({ 'success': `New user ${user} avtivate!` });
   
        // const foundUser = pendingUsersDB.users.find(person => person.id === hash);
       
        // //store new user
        // usersDB.setUsers([...usersDB.users, foundUser]);
        // await fsPromises.writeFile(
        //     path.join(__dirname, '..', 'model', 'users.json'),
        //     JSON.stringify(usersDB.users)
        // );
        //     //del
        // const index = pendingUsersDB.users.findIndex(a => a.id === hash)
        // if (index < 0) { throw new Error('Item not found!') };
 
        // const tmp = pendingUsersDB.users.splice(index, 1);
        // console.log(tmp);
   
        // await fsPromises.writeFile(
        //     path.join(__dirname, '..', 'model', 'pending-users.json'),
        //     JSON.stringify(pendingUsersDB.users, null, 2)
        // );
       
    } catch {
        res.status(422).send('User cannot be activated!');
    }
}

module.exports = { handleActivate };


// const usersDB = {
//     users: require('../model/users.json'),
//     setUsers: function (data) { this.users = data }
// }

// const pendingUsersDB = {
//     users: require('../model/pending-users.json'),
//     setUsers: function (data) { this.users = data }
// }

// const fsPromises = require('fs').promises;
// const path = require('path');


// const handleActivate = async (req, res) => {
//     const { hash } = req.params;

//     try {
//         const foundUser = pendingUsersDB.users.find(person => person.id === hash);
       
//         //store new user
//         usersDB.setUsers([...usersDB.users, foundUser]);
//         await fsPromises.writeFile(
//             path.join(__dirname, '..', 'model', 'users.json'),
//             JSON.stringify(usersDB.users)
//         );
//             //del
//         const index = pendingUsersDB.users.findIndex(a => a.id === hash)
//         if (index < 0) { throw new Error('Item not found!') };
 
//         const tmp = pendingUsersDB.users.splice(index, 1);
//         console.log(tmp);
   
//         await fsPromises.writeFile(
//             path.join(__dirname, '..', 'model', 'pending-users.json'),
//             JSON.stringify(pendingUsersDB.users, null, 2)
//         );
       
//     } catch {
//         res.status(422).send('User cannot be activated!');
//     }
// }

// module.exports = { handleActivate };