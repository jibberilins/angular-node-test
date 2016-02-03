var mongoose = require('mongoose'),
	db = mongoose.connection;

mongoose.connect('mongodb://localhost:9393/test');

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("We are connected");
});