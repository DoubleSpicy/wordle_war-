
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
    photo:{
        type: String,
        default:"data:image/png;base64,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"
    },
    refreshToken: String
});



module.exports = mongoose.model('pending-users', userSchema);