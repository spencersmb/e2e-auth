const passport = require('passport');
const User = require('../models/user');
const config = require('../config');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local');

/*
    SignUp ------ send email + pw ------ verify its not in use -------- Return a JWT Token
    SignIn ------ send email + pw ------ verify email + pw combo with Local Strategy ------ Return JWT Token
    Auth'D Request for a resource ----- verify token with JWT Strategy ------ Give them resource access
*/

// Create Local Strategy for login
const localOptions = {
    usernameField: 'email'
};

//tell localStrategy to look for the email instead of userName
const localLogin = new LocalStrategy(localOptions, function(email, password, done){
    // Verify user + password
    // Call done if correct 
    // Otherwise call done with false

    User.findOne({email: email}, function(err, user){

        //err
        if(err){return done(err)}

        // no err, but no user found
        if(!user){return done(null, false)}

        //found user - compare pw sent in with our encrypted pw

        user.comparePassword(password, function(err, isMatch){
            if(err){return done(err);}
            if(!isMatch){return done(null, false);}

            return done(null, user);
        });


    });
});


// Setup Options
const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromHeader('authorization'),
    secretOrKey: config.secret
};

// Create JWT Strategy
const jwtLogin = new JwtStrategy(jwtOptions, function(payload, done){
    
    // this 2nd function(cb) above gets called when someone tries to log in
    // Payload => { sub: user.id, iat: timestamp }, this is the obj we sent into get encoded for the client frontend
    // Done is a callback that we call when we have a successfull auth

    // Step 1: See if user id in the payload is in the DB
    // IF true, call done
    // Else call done without user obj

    User.findById(payload.sub, function(err, user){

        if(err){return done(err, false);}

        if(user){
            // null is no error, send our found user through
            done(null, user);
        }else{
            //no error, no user
            done(null, false);
        }

    });



});


// Tell Passport to use this Strategy
passport.use(jwtLogin);
passport.use(localLogin);