const checkAuthenticated = (req, res, next) => {
  const isAuthenticated = req.isAuthenticated();
  if (isLoggedIn) {
    //should be isAuthenticated
    next();
  }
  next();
};

module.exports = checkAuthenticated;
