const mongoose = require('mongoose');

const messageSchema = mongoose.Schema({
    message: String,
    date: Date,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
});

const Message = mongoose.model('Message', messageSchema);
module.exports = Message;