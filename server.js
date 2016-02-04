var express     = require('express');
var app         = express();
var bodyParser  = require('body-parser');
var morgan      = require('morgan');
var MongoClient = require('mongodb').MongoClient;
var assert      = require('assert');
var jwt         = require('jsonwebtoken'); 
var config      = require('./config'); 
var User        = require('./app/models/users');
var passport    = require('passport');
var flash       = require('connect-flash');


var port = process.env.PORT || 8383;
var url = 'mongodb://localhost:27017/skylogindb';
MongoClient.connect(url, function(err, db){
	assert.equal(null, err);
	console.log("Connected correctly to server.");
    db.close();
});

//Authentication
require('./passport')(passport);

app.use(express.static(__dirname + '/app'));
app.use(express.static(__dirname + '/models'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(morgan('dev'));
app.use(flash()); 

//Routes
require('./routes.js')(app, passport);

// start the server
app.listen(port);
console.log('Magic happens at http://localhost:' + port);