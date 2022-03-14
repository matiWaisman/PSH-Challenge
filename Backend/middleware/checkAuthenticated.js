const checkAuthenticated = (req, res, next) => {
  console.log("Se ejecuta el middleware");
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login");
};

module.exports = checkAuthenticated;
