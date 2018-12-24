//Passport.js is used to implement the Google login
//Details about this implementation can be found in Passport.JS documentations under OAuth2
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('../config/keys');
const mongoose = require('mongoose');

//Retrieving the User Model of the MongoDB database which is setup in the Models directory
const User = mongoose.model('users');


passport.serializeUser((user, done)=>{
    done(null, user.id);
});

passport.deserializeUser((id, done)=>{
    User.findById(id).then(user => {
        done(null, user);
    });
});

//Google strategy implementation given in passport.JS under Google OAuth20 documentations
passport.use(new GoogleStrategy({
    //These values are setup in console.developers.google.com
    //Create account, create a new project, enable API keys, setup origin and redirect URLS
    //Need to create two projects here, one for development and one for production. In the production version, please enter heroku domain URL and callback URLs accordingly
        clientID : keys.googleClientID,
        clientSecret : keys.googleClientSecret,
        callbackURL : '/auth/google/callback',
        proxy: true
    },async (accessToken, refreshToken, profile, done) => {

        const existingUser = await User.findOne({googleId: profile.id})

        if(existingUser){
            //we already have a record with the given profile ID
            return done(null, existingUser);
        }
        //we don't have a user record with this ID, make new record
        const user = await new User({ googleId: profile.id}).save()
        done(null, user);
    }
));
