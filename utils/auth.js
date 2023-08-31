const withAuth = (redirect) => (req, res, next) => {
  if (!req.session.loggedIn) {
    res.redirect("/api/users/login?redirect=" + redirect);
  } else {
    next();
  }
};

module.exports = withAuth;
