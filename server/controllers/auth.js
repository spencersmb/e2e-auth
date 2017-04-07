const User = require('../models/user');

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
        res.json({success: true}    );
       });
        
    });

}