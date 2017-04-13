const User = require('../models/user');
const jwt = require('jwt-simple');
const config = require('../config');

/*
    SignUp:
    When user signs up, before we save data, we encrypt the password for storage in DB.
    Then when we save, we give a response back to the client with a JWT based on user.id + timestamp.
    The JWT uses our secret word to decode the token at a later point in time to login.
*/

// On sign up - encode user with JWT and give the JWT back on response
function tokenForUser(user){

     const timestamp = new Date().getTime();

    // first arg is the info we want encrypted
    // 2nd arg is the secret we want to encode with
    return jwt.encode( 
        {
            // subject - who is this token about -jwt standard
            sub: user.id,
            iat: timestamp // issue at time
        }, config.secret 
    )
}

exports.authoirzeToken = function(req, res, next){

    res.send({
        authorized: req
    });
}

exports.signin = function(req, res, next){
    //User has already been authed - just need to give them a token

    // we have access to the user with token because of the done() method supplied by passport in our strategies
    res.send({
        token: tokenForUser(req.user)
    });

};

exports.signup = function(req, res, next){
    //req = request and represents the incoming http request
    //res = args that represent the response and what we send back to the request
    //next is used for error handling.


    //Pull data from req
    const email = req.body.email;
    const password = req.body.password;

    if( !email || !password ){
        return res.status(422).send({error: "You must supply an email and a password"});
    }

    //ADD EDGE CASE FOR VALIDATING AN EMAIL PROPERLY WITH @SIGN etc...


    //step 2: see if a user with a given email exists
    User.findOne({email: email}, function(err, existingUser){
       
       // check for DB error first
       if(err){
           return next(err);
       }

       // If a user with email does exist, return an error
       if(existingUser){

        //return http code - unprocessable data
        res.status(422)
            .send({error: 'Email is in use'});
       }

       // create new user in memory
       // If a user with email does not exist, create and save user record
       const user = new User({
           email: email,
           password: password
       });

       // Save record to the DB
       // callback for when we get notified if user was saved or not
       user.save(function(err ){
        if(err){return next(err);}

        // Respond to a request indicating the user was created
        res.json( {token: tokenForUser(user)} );
       });
        
    });

}