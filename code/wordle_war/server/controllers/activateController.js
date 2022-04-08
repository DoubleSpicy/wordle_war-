const usersDB = {
    users: require('../model/users.json'),
    setUsers: function (data) { this.users = data }
}

const pendingUsersDB = {
    users: require('../model/pending-users.json'),
    setUsers: function (data) { this.users = data }
}

const fsPromises = require('fs').promises;
const path = require('path');


const handleActivate = async (req, res) => {
    const { hash } = req.params;

    try {
        const foundUser = pendingUsersDB.users.find(person => person.id === hash);
       
        //store new user
        usersDB.setUsers([...usersDB.users, foundUser]);
        await fsPromises.writeFile(
            path.join(__dirname, '..', 'model', 'users.json'),
            JSON.stringify(usersDB.users)
        );
            //del
        const index = pendingUsersDB.users.findIndex(a => a.id === hash)
        if (index < 0) { throw new Error('Item not found!') };
 
        const tmp = pendingUsersDB.users.splice(index, 1);
        console.log(tmp);
   
        await fsPromises.writeFile(
            path.join(__dirname, '..', 'model', 'pending-users.json'),
            JSON.stringify(pendingUsersDB.users, null, 2)
        );
       
    } catch {
        res.status(422).send('User cannot be activated!');
    }
}

module.exports = { handleActivate };