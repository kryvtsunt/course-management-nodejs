module.exports = function (app) {
  app.get('/api/user', findAllUsers);
  app.get('/api/user/:userId', findUserById);
  app.get('/api/user/username/:userName', findUserByUsername);
  app.post('/api/user', createUser);
  app.get('/api/profile', profile);
  app.post('/api/logout', logout);
  app.post('/api/login', login);
  app.get('/api/status', checkStatus);
    app.put('/api/user/update', updateUser);
    app.get('/api/admin/status', checkAdminStatus);

  var userModel = require('../models/user/user.model.server');

  function login(req, res) {
    var credentials = req.body;
    userModel
      .findUserByCredentials(credentials)
      .then(function(user) {
          if (user !== null) {
              req.session['currentUser'] = user;
          }
        res.json(user);
      })
  }

    function updateUser(req, res) {
        var user = req.body;
        var u = req.session['currentUser']
        var id = u._id
        userModel.updateUser(id, user)
            .then(function () {
                req.session['currentUser'] = user;
                res.send(user);
            })
    }

    function checkStatus(req, res) {
        if (req.session['currentUser']) {
            res.send(true)
        }
        else res.send(false)
    }

    function checkAdminStatus(req, res) {
        if (req.session['currentUser'].role === 'admin') {
            res.send(true)
        }
        else res.send(false)
    }

  function logout(req, res) {
    req.session.destroy();
    res.send(200);
  }

  function findUserById(req, res) {
    var id = req.params['userId'];
    userModel.findUserById(id)
      .then(function (user) {
        res.json(user);
      })
  }

    function findUserByUsername(req, res) {
        var userName = req.params['userName'];
        userModel.findUserByUsername(userName)
            .then(function (user) {
                res.json(user);
            })
    }

  function profile(req, res) {
    res.send(req.session['currentUser']);
  }

  function createUser(req, res) {
    var user = req.body;
    userModel.createUser(user)
      .then(function (user) {
        req.session['currentUser'] = user;
        res.send(user);
      })
  }

  function findAllUsers(req, res) {
    userModel.findAllUsers()
      .then(function (users) {
        res.send(users);
      })
  }
}
