const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    _id:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    roles: {
        User: {
            type: Number,
            default: 2001
        },
        Editor: Number,
        Admin: Number
    },
    password: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true,
        default: 1500
    },
    wincount:{
        type: Number,
        required: true,
        default: 0
    },
    losecount:{
        type: Number,
        required: true,
        default: 0
    },
    refreshToken: String
});

module.exports = mongoose.model('resetAccount', userSchema);