//user model - local definition of what a user exactly is so mongose db knows what to do with a user
const bcrypt = require('bcrypt-nodejs');
const mongoose = require('mongoose');
const Schema = mongoose.Schema; // Schema tells mogoose about our particular fields

// Define our DB model
const userSchema = new Schema({
    email: { type: String, unique: true, lowercase: true }, // can only have 1 email, no duplicates - this will throw an error
    password: String
});

// On Save Hook, encrypt password
// Before saving a model, run this function
// run this right before a user is saved
userSchema.pre('save', function(next){
   
    // Context is the user model about to be saved
    const user = this;


    // generate a salt, then pass callback after salt has been created
    bcrypt.genSalt(10, function(err, salt){
        if(err){
            return next(err);
        }

        // hash password using salt
        // when we get hash back run callback
        bcrypt.hash(user.password, salt, null, function(err, hash){
            if(err){
                return next(err);
            }

            // overwrite user password with the salt/encrypted password
            user.password = hash;
            next();
        })
    });
});

//Helper method to check PW
userSchema.methods.comparePassword = function(candidatePassword, callback){

    //compare with bcrypt method
    // this.password is the pw stored in the DB
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch){
        
        if(err){return callback(err);}


        callback(null, isMatch);
    });
};

// Create the model class
// loads the schema into mongoose with a collection named user
const ModelClass = mongoose.model('user', userSchema);

module.exports = ModelClass;
