const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Username']
    },
    password: {
        type: String,
        required: [true, 'Password']
    },
})

module.exports = mongoose.model('User', userSchema);