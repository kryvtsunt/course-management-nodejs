var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    username: String,
    password: String,
    firstName: String,
    lastName: String,
    email: String,
    img_path: String,
    role: String,
}, {collection: 'user'});

module.exports = userSchema;