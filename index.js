const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const keys = require('./configs/keys');
const bodyParser = require('body-parser');
require('./models/User');
require('./services/passport');
const authRoutes = require('./routes/authRoutes');
const billingRoutes = require('./routes/billingRoutes');

const app = express();

//set up passport to use middleware
app.use(bodyParser.json());
app.use(
	cookieSession({
		maxAge: 5 * 24 * 60 * 60 * 1000,
		keys: [keys.cookieKey]
	})
);

app.use(passport.initialize());
app.use(passport.session());

//connect to remote database
var databaseURL = process.env.DATABASE || keys.mongoURI;
mongoose.connect(databaseURL);

//======== routes ==========
authRoutes(app);
billingRoutes(app);

//Server set-up
const PORT = process.env.PORT || 4000;

app.listen(PORT, function(err) {
	console.log('Server running in port: ' + PORT);
});
