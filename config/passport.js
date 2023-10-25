const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const connection = require('./database');
const User = connection.models.User;
const validPassword = require('../lib/passwordUtils').validPassword;

const customFields = {
    usernameField: 'username',
    passwordField: 'password'
};

// Basic Verify Callback
const verifyCallback = (username, password, done) => {
    // check the DB for the user
    User.findOne({username: username})
    .then((user) => {
        // if the user is not found, return false
        if(!user) { return done(null, false) }

        // check the password
        const isValid = validPassword(password, user.hash, user.salt);

        // if the password is valid, return the user
        if(isValid) {
            return done(null, user);
        }
        // if the password is invalid, return false
        else {
            return done(null, false);
        }
    })
    .catch((err) => {
        done(err);
    });
}

const strategy = new LocalStrategy(customFields, verifyCallback);

passport.use(strategy);

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((userId, done) => {
    User.findById(userId)
    .then((user) => {
        done(null, user);
    })
    .catch(err => done(err));
});