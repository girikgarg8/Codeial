const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const User = require('../models/user');

//tell pasport to use a new strategy for google login
passport.use(new googleStrategy({
    clientID: "523939841648-ubkv0cv9ve9f1b7mk4gvveos64cf9als.apps.googleusercontent.com",
    clientSecret: "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",
    callbackURL: "http://localhost:8000/users/auth/google/callback"
}, function (accessToken, refreshToken, profile, done) {
    //find a user
    User.findOne({ email: profile.emails[0].value }).exec(function (err, user) {
        if (err) {
            console.log('Error in google strategy-passport', err);
            return;
        }
        console.log(profile);
        console.log(accessToken);
        console.log(refreshToken);
        if (user) {
            //if user found then set the user as req.usrr
            return done(null, user);
        } else {
            //if not found,create the user and set it as req.user
            User.create({
                name: profile.displayName,
                email: profile.emails[0].value,
                password: crypto.randomBytes(20).toString('hex')
            }, function (err, user) {
                if (err) {
                    console.log('Error in creating user google ouath strategy passport', err);
                    return;
                }
                return done(null, user);
            })
        }
    })
}
))