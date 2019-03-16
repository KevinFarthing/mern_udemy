const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');

const User = mongoose.model('users');

passport.use(
    new GoogleStrategy(
        {
            clientID: keys.googleClientID,
            clientSecret: keys.googleClientSecret,
            callbackURL: '/auth/google/callback',
            userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo"
        },
    (accessToken, refreshToken, profile, done) => {
        User.findOne({ googleId: profile.id })
            .then((existingUser) => {
                if(existingUser) {
                    // user exists! log in.
                    done(null, existingUser);
                } else {
                    // user don't! create user!
                    new User({ googleId: profile.id }).save()
                        .then(user => done(null, user));
                    // huh, second param in User model is automatically filled with {googleId:profile.id}?
                }
            })
    })
);