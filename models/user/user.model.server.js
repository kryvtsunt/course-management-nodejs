var mongoose = require('mongoose');
var userSchema = require('./user.schema.server');
var userModel = mongoose.model('UserModel', userSchema);

function findUserByCredentials(credentials) {
  return userModel.findOne(credentials);
}

function findUserById(userId) {
  return userModel.findById(userId);
}

function findUserByUsername(username) {
    return userModel.findOne({username: username});
}

function createUser(user) {
  user.role = "student";
  return userModel.create(user);
}

function updateUser(userId, user) {
    return userModel.update({_id: userId},{$set:{ firstName: user.firstName, lastName: user.lastName, email: user.email, password: user.password, img_path: user.img_path}, phone: user.phone, address: user.address})
}

function findAllUsers() {
  return userModel.find();
}

var api = {
  createUser: createUser,
  findAllUsers: findAllUsers,
  findUserById: findUserById,
  findUserByCredentials: findUserByCredentials,
    updateUser: updateUser,
    findUserByUsername: findUserByUsername
};

module.exports = api;