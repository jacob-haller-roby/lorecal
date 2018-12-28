module.exports = {
    loggedIn: (req, res, next) => {
        if (req.isAuthenticated()) {
            return next();
        } else {
            return res.send(401);
        }
    },

    hasRole: (role) => (req, res, next) => {
        if (req.user && req.user.role === role) {
            return next();
        } else {
            return res.send(401);
        }
    }
};