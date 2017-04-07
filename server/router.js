//Handle Routes

const Authentication = require('./controllers/auth');

module.exports = function(app){

    //anything posted to this url run this function from our controller
    app.post('/signup', Authentication.signup);
    
};