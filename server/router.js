//Handle Routes

const Authentication = require('./controllers/auth');
const passportServices = require('./services/passport');
const passport = require('passport');

// This sits between the inc-request .... passport ..... Route Handler ( HELPER )
// Use the JWT strategy and dont create a cookie because we are using tokens
const requireAuth = passport.authenticate('jwt', {session: false});

const requireSignIn = passport.authenticate('local', {session: false});

module.exports = function(app){

    app.post('/signin', requireSignIn, Authentication.signin);

    app.get('/', requireAuth ,function(req, res, next){

        res.send({
            message: 'user authorized'
        });

    });

    //anything posted to this url run this function from our controller
    app.post('/signup', Authentication.signup);
    
};