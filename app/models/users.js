var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');
console.log("In modules now...");
var userSchema = mongoose.Schema({
	users : {
	    username: String, 
	    password: String
	}
});

userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

userSchema.methods.verifyPassword = function(password) {
	console.log(this.user.password);
    return bcrypt.compareSync(password, this.users.password);
};

module.exports = mongoose.model('User', userSchema);