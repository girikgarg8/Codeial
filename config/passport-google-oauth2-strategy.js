const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const User = require('../models/user');
const env=require('./environment');
//tell pasport to use a new strategy for google login
passport.use(new googleStrategy({
    clientID: env.google_client_id,
    clientSecret: env.google_client_secret,
    callbackURL: env.google_call_back_url
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