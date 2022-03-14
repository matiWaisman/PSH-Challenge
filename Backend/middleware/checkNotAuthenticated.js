const checkNotAuthenticated = (req, res, next) => {
  const isAuthenticated = req.isAuthenticated();
  if (!isLoggedIn) {
    //should be !isAuthenticated
    res
      .status(401)
      .json({ msg: "Not allowed to this path without credentials" });
  }
};

module.exports = checkNotAuthenticated;
