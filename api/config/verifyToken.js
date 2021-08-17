var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
var config = require('../routes/index'); // get our config file

function verifyToken(req, res, next) {
  // check header or url parameters or post parameters for token
  var token = req.headers['authorization'];
  console.log(token,'token')
  var userRefresh = req.headers['userrefreshtoken'];
  console.log(userRefresh,'userRefresh')
// TO CHECK WHETHER TOKEN IS EXPIRED IF YES IT WILL JUST RETURN ERROR

  //  if (!token) {
  //   return res.status(403).send({ auth: false, message: 'No token provided.' });
  // }

// // verifies secret and checks exp
// jwt.verify(token, config.secret.secret, function(err, decoded) {      
//   if (err) 
//     return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });    

//   // if everything is good, save to request for use in other routes
//   req._id = decoded._id;
//   next();
// });

  // TO CHECK WHETHER TOKEN IS EXPIRED IF YES IT WILL REGENERATE THE TOKEN USING REFRESH TOKEN

  if (!token) {
    return res.status(403).send({ auth: false, message: 'No token provided.' });
  }
    
  // verifies secret and checks exp
  jwt.verify(token, config.secret.secret, function(err, decoded) {   
    if (err){
      if(userRefresh){
        jwt.verify(userRefresh, config.secretRefresh.secret, (err, user) => {
          console.log(user,'user')
          if (!err) {
            console.log('token expired');
              const token = jwt.sign({ _id: user._id }, config.secret.secret, {
                  expiresIn: "20s"
              });
              req._id = user._id;
              next();
          } else {
              return res.json({
                  success: false,
                  message: "Invalid refresh token"
              });
          }
      });
      }else{
        return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
      }
    }else{
      console.log('token is not expired');
      req._id = decoded._id;
      next();
    }
  });

}

module.exports = verifyToken;