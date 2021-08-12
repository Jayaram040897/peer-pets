const mongoose = require('mongoose');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = mongoose.model('User');

passport.use(
  new LocalStrategy(
    {
      usernameField: 'username'
    },
    function(username, password, done) {
      User.findOne({ userId : username }, async function(err, user) {
        if (err) {
          return done(err);
        }
        // Return if user not found in database
        if (!user) {
          return done(null, false, {
            success: false,
            message: 'No users found with this email!!'
          });
        }
        // Return if password is wrong

        const isPasswordCorrect = await user.comparePassword(password,user.password);

        if (!isPasswordCorrect) {
          return done(null, false, {
            success: false,
            message: 'Password is incorrect'
          });
        }
        // If credentials are correct, return the user object
        return done(null, user);
      });
    }
  )
);
