const withAuth = (req, res, next) => {
  // If the user isn't logged in, redirect them to the login route
  !req.session.loggedIn?
    res.redirect('/login'):
    next()
  
};

module.exports = withAuth;
