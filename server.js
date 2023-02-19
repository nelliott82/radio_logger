const express = require('express');
const session = require('express-session');
const app = express();
const router = express.Router()
const http = require('http');
const hostname = '127.0.0.1';
const port = 3000;
const path = require('path');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser'); // Middleware
const cookieParser = require('cookie-parser')
const componentsDirUrl = './src/client/src/components';

async function main() {
  await mongoose.connect('mongodb://localhost:27017/test');
  
  // use `await mongoose.connect('mongodb://user:password@localhost:27017/test');` if your database has auth enabled
}

app.use(express.json());

app.set('view engine', 'html');

/*app.use(express.static(config.set('/components')));*/

app.all('/*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});

app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));

app.use(cors({credentials: true, origin: true}));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.set('port', (process.env.PORT || 3000));

app.use(cookieParser());

app.use(express.static(path.join(__dirname, '/public')));
app.use(express.static(path.join(__dirname, '/src/client/src/components')));

// for including all css & image file in server
app.use(express.static(__dirname + "/public"));

app.use(express.static(__dirname +"/src/client/src/components"));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html')
});

app.get('/dashboard', (req, res) => {
  res.sendFile(componentsDirUrl + '/dashboard.html', { root: __dirname });
});

app.get('/contestlog', (req, res) => {
  res.sendFile(componentsDirUrl + '/contestlog.html', { root: __dirname });
});

app.get('/scanlog', (req, res) => {
  res.sendFile(componentsDirUrl + '/scanlog.html', { root: __dirname });
});

app.get('/swllog', (req, res) => {
  res.sendFile(componentsDirUrl + '/swllog.html', { root: __dirname });
});

app.get('/signin', function(req, res) {
  res.sendFile(componentsDirUrl + '/signin.html', { root: __dirname });
});

app.get('/hamlog', function(req, res) {
  res.sendFile(componentsDirUrl + '/hamlog.html', { root: __dirname });
});

app.get('/signup', function(req, res) {
  res.sendFile(componentsDirUrl + '/signup.html', { root: __dirname });
});

app.get('/mwlog', function(req, res) {
  res.sendFile(componentsDirUrl + '/mwlog.html', { root: __dirname });
});

app.get('/vhflog', function(req, res) {
  res.sendFile(componentsDirUrl + '/vhflog.html', { root: __dirname });
});

app.post('/signin', (req, res) => {
  // Insert Login Code Here
  let username = req.body.username;
  let password = req.body.password;
  res.send(`Username: ${username} Password: ${password}`);
});

// Route to Login Page
app.get('/login', (req, res) => {
  res.sendFile(__dirname + '/signin.html');
});

app.post('/login', (req, res) => {
  // Insert Login Code Here
  let username = req.body.username;
  let password = req.body.password;
  res.send(`Username: ${username} Password: ${password}`);
});

app.post('/auth', function(request, response) {
	// Capture the input fields
	let username = request.body.username;
	let password = request.body.password;
	// Ensure the input fields exists and are not empty
	if (username && password) {
		// Execute SQL query that'll select the account from the database based on the specified username and password
		connection.query('SELECT * FROM accounts WHERE username = ? AND password = ?', [username, password], function(error, results, fields) {
			// If there is an issue with the query, output the error
			if (error) throw error;
			// If the account exists
			if (results.length > 0) {
				// Authenticate the user
				request.session.loggedin = true;
				request.session.username = username;
				// Redirect to home page
				response.redirect('/home');
			} else {
				response.send('Incorrect Username and/or Password!');
			}			
			response.end();
		});
	} else {
		response.send('Please enter Username and Password!');
		response.end();
	}
});

app.get('/logout', function (req, res) {
  req.session.destroy();
  res.send("logout success!");
});

app.post('/signup', function(req, res){
  if(!req.body.id || !req.body.password){
     res.status("400");
     res.send("Invalid details!");
  } else {
     Users.filter(function(user){
        if(user.id === req.body.id){
           res.render('signup', {
              message: "User Already Exists! Login or choose another user id"});
        }
     });
     var newUser = {id: req.body.id, password: req.body.password};
     Users.push(newUser);
     req.session.user = newUser;
     res.redirect('/protected_page');
  }
});

/* app.use((req, res) => {
  res.status(404).render('404', { title: '404' });
});
*/

var allowCrossDomain = function(req, res, next) {
  res.header('Access-Control-Allow-Origin', 'example.com');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');

  next();
}

/*
app.configure(function() {
  app.use(express.bodyParser());
  app.use(express.cookieParser());
  app.use(express.session({ secret: 'cool beans' }));
  app.use(express.methodOverride());
  app.use(allowCrossDomain);
});
*/
module.exports = router;