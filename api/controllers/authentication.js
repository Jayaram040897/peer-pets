const mongoose = require('mongoose');
const passport = require('passport');
const User = mongoose.model('User');
var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
const config = require('../routes/index')

let refreshTokens = [];
module.exports.register = (req, res) => {
  let user = new User({
    userId: req.body.username,
    password: req.body.password,
    isAdmin: false
  });
  user.save((err, data) => {
    if (err) {
      res.send({ message: JSON.stringify(err) })
    } else {
      res.status(200);
      res.send({
        message: "Registration Success!!",
        data: data,
        success: true
      });
    }
  });
};

module.exports.login = (req, res) => {
  passport.authenticate('local', (err, user, info) => {
    // If Passport throws/catches an error
    if (err) {
      res.status(404).json(err);
      return;
    }
    // If a user is found
    if (user) {
      user.auth = true;
      const token = jwt.sign({ _id: user._id }, config.secret.secret, {
        expiresIn: '20s' // expires in 24 hours
      });
      const refreshToken = jwt.sign({ _id: user._id }, config.secretRefresh.secret, {
        expiresIn: '365d' // expires in 24 hours
      });
      refreshTokens.push(refreshToken);
      // const token = user.generateJwt();
      res.status(200);
      res.json({
        success: true,
        user: user,
        token: token,
        refreshToken: refreshToken
      });
    } else {
      // If user is not found
      res.status(200).send({info:info,success:false});
    }
  })(req, res);
};

module.exports.userId = (req, res) => {
  const query = { 'userId': req.body.userId };
  //If no input is provided
  if (!req.body) {
    res.status(401).json({
      userExist: false
    });
  } else {
    // Otherwise continue
    User.findOne(query).exec(function (err, user) {
      if (user) {
        res.status(200).send({ userExist: true });
      } else {
        res.status(200).send({ userExist: false });
      }
    }, (err => console.log(err)));
  }
}
