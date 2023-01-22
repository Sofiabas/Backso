const mongoose = require('mongoose');

const User = mongoose.model('usuarios', mongoose.Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true },
}));

module.exports = User