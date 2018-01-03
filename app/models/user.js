'use strict';

const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    registeron: Date,
    email: String,
    password: String,
});

const User = mongoose.model('User', userSchema);
module.exports = User;