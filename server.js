var express     = require('express');
var app         = express();
var bodyParser  = require('body-parser');
var morgan      = require('morgan');
var MongoClient = require('mongodb').MongoClient;
var assert      = require('assert');

var jwt    = require('jsonwebtoken'); 
var config = require('./config'); 
var User   = require('./app/models/users'); 
    

var port = process.env.PORT || 8383;
var url = 'mongodb://localhost:27017/skylogindb';
MongoClient.connect(url, function(err, db){
	assert.equal(null, err);
	console.log("Connected correctly to server.");
	db.close();
});

app.use(express.static(__dirname + '/app'));
app.use(express.static(__dirname + '/models'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// use morgan to log requests to the console...hopefully
app.use(morgan('dev'));

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});

// start the server
app.listen(port);
console.log('Magic happens at http://localhost:' + port);