function checkAuth(req, res, next) {
  req.isAuthenticated() ? res.redirect('/dashboard') : next();
}
function checkUnauth(req, res, next) {
  req.isUnauthenticated() ? res.redirect('/') : next();
}

module.exports = {
  checkAuth,
  checkUnauth
}