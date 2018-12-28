const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const User = require('./db/dao/User');

passport.use(new LocalStrategy(
    function (username, password, done) {
        User.isPasswordValid({username}, password)
            .then(user => {
                if (user) {
                    return done(null, user)
                }
                return done(null, false, {message: 'Invalid username password combination'})
            });
    }
));

passport.serializeUser(function(user, done) {
    console.log('serializing', user)
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    console.log('deserializing', id)
    User.findOne({id})
        .then(user => done(null, user));
});

module.exports = passport;