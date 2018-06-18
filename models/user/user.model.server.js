var mongoose = require('mongoose');
var userSchema = require('./user.schema.server');
var userModel = mongoose.model('UserModel', userSchema);

function findUserByCredentials(credentials) {
  return userModel.findOne(credentials, {username: 1});
}

function findUserById(userId) {
  return userModel.findById(userId);
}

function createUser(user) {
  return userModel.create(user);
}

function updateUser(userId, user) {
    return userModel.update({_id: userId},{$set:{ firstName: user.firstName, lastName: user.lastName, email: user.email, password: user.password, img_path: user.img_path}})
}

function findAllUsers() {
  return userModel.find();
}

var api = {
  createUser: createUser,
  findAllUsers: findAllUsers,
  findUserById: findUserById,
  findUserByCredentials: findUserByCredentials,
    updateUser: updateUser
};

module.exports = api;