const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    googleId: String
});

const users = mongoose.model('users', userSchema);
module.exports = users;