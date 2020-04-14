const helpers = {};

helpers.isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  console.log('error_msg', 'Not Authorized.');
  res.redirect('/users/signin');
};

module.exports = helpers;