const User = require('../model/User');
const resetAccount = require('../model/resetAccount');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const handleUploadImage = async (req, res) => {
    const { userid, photo } = req.body;
    console.log("aaaaaaaaaingpututputpuptutpup ")
    console.log( userid, photo);
    try {
        const aHash = await User.findOne({ _id: userid }).exec();
        if (!aHash) {
            return res.status(422).send('cannot find you user');
        }

        const photoupdate = await User.update({_id: userid}, {photo: photo});

        return res.json({ message: 'photo has been reseted!' });
    } catch (err) {
        res.status(500).json({ 'message': err.message });
    }
}

module.exports = { handleUploadImage };
