module.exports = function(app, passport) {
	app.get('/', function(req, res) {
	    res.sendFile(__dirname + '/index.html');
	});

	app.get('/login', function(req, res) {
	    res.sendFile(__dirname + '/app/login/login.html');
	});

	app.get('/about', function(req, res) {
	    res.sendFile(__dirname + '/app/about/about.html');
	});

	app.post('/login', function(req, res, next) {
	  console.log('Now in the login POST request...');
	  console.log('Starting to body parse: ' + req.body.username + ' ' + req.body.password);

	  passport.authenticate('login', function(err, user, info) {
	    if (err) {
	      console.log('passport error: ' + err);
	      return next(err);
	    }
	    if (!user) {
	      console.log('No user under that name found!');
	      return res.redirect('/login');
	    }
	    req.logIn(user, function(err) {
	      if (err) {
	        console.log('login error: ' + err);
	        return next(err);
	      }
	      return res.redirect('/about/about.html');
	    });
	  })(req, res, next);
	});

};

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()){
        return next();
    }
    res.redirect('/');
}