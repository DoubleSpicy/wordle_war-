const User = require('../model/User');
const pendingUser = require('../model/pending-users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const handleLogin = async (req, res) => {
    const { user, pwd } = req.body;
    if (!user || !pwd) return res.status(400).json({ 'message': 'Username and password are required.' });

    const foundUser = await User.findOne({ username: user }).exec();

    if (!foundUser) return res.sendStatus(401); //Unauthorized 
    // evaluate password 
    const match = await bcrypt.compare(pwd, foundUser.password);
    if (match) {
        const roles = Object.values(foundUser.roles);
        // create JWTs
        //to see the secrect item
        //if after 120s it will logout
        const accessToken = jwt.sign(
            {
                "UserInfo": {
                    "username": foundUser.username,
                    "roles": roles
                }
            },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '120s' }
        );
        //login after 1h auto logout
        const refreshToken = jwt.sign(
            { "username": foundUser.username },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: '1h' }
        );
        // Saving refreshToken with current user
        foundUser.refreshToken = refreshToken;
        const result = await foundUser.save();
        console.log(result);

       
        const userid = foundUser._id;
        const username = foundUser.username;
        const rating = foundUser.rating || 1500;
        const wincount = foundUser.wincount || 0;
        const losecount = foundUser.losecount || 0;
        const photo = foundUser.photo;

        res.cookie('jwt', refreshToken, { httpOnly: true, sameSite: 'None', maxAge: 24 * 60 * 60 * 1000 }); //secure: true, 
        res.json({ roles, accessToken, username, userid, rating, wincount, losecount, photo });
    } else {
        res.sendStatus(401);
    }
}

module.exports = { handleLogin };