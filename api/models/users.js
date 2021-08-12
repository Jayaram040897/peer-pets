const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
bcrypt = require('bcrypt');
SALT_WORK_FACTOR = 10;

const userSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  password: { type: String, required: true },
  isAdmin: { type: Boolean }
},
  { timestamps: { createdAt: 'created_at', updateAt: 'updated_at' } }
);

userSchema.pre('save', function (next) {
  var user = this;
  bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
    if (err) return next(err);

    // hash the password using our new salt
    bcrypt.hash(user.password, salt, function (err, hash) {
      if (err) return next(err);
      // override the cleartext password with the hashed one
      user.password = hash;
      next();
    });
  });
});

userSchema.methods.comparePassword = function (candidatePassword, userPassword) {
  return new Promise(function (resolve, reject) {
    bcrypt.compare(candidatePassword, userPassword, function (err, isMatch) {
      if (err) resolve(false);
      return resolve(isMatch)
    });
  })
};

mongoose.model('User', userSchema);
