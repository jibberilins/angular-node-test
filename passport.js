var LocalStrategy    = require('passport-local').Strategy;
var User       = require('./app/models/users');

module.exports = function(passport) {

    //Maintains sessions for the user once logged in
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    // deserialized when subsequent requests are made
    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });

     passport.use('login', new LocalStrategy({
        usernameField : 'username',
        passwordField : 'password',
        passReqToCallback : true 
    },
    function(req, name, password, done) {
        console.log("In passport authentication now...");
        User.findOne({ 'users.username' :  name }, function(err, user) {
            console.log(err);
            console.log(user);
            if (err){ 
                return done(err);
            }
            if (!user){
                return done(null, false, req.flash('error', 'This user does not exist.'));
            }
            if (!user.verifyPassword(password)){
                return done(null, false, req.flash('error', 'Enter correct password'));
            } else {
                return done(null, user);
            }
        });
    }));
};
