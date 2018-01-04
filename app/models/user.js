'use strict';

const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    registeron: Date,
    email: String,
    password: String,
    followers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
});

const User = mongoose.model('User', userSchema);
module.exports = User;