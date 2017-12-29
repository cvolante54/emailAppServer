const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const mongoose = require('mongoose');
const keys = require('../configs/keys');

const User = mongoose.model('users');

passport.serializeUser((user, done) => {
	done(null, user.id);
});

passport.deserializeUser((id, done) => {
	User.findById(id).then(user => {
		done(null, user);
	});
});

//setting up google Strategy
passport.use(
	new GoogleStrategy(
		{
			clientID: keys.googleClientID,
			clientSecret: keys.googleClientSecret,
			callbackURL: '/auth/google/callback',
			proxy: true //let's us use heroku as an intermediary while being secure
		},
		(accessToken, refreshToken, profile, done) => {
			User.findOne({ googleId: profile.id }).then(existingUser => {
				if (existingUser) {
					//user is already in our DB
					done(null, existingUser);
				} else {
					//user is not yet in our DB
					new User({
						googleId: profile.id,
						displayName: profile.displayName,
						email: profile.emails[0].value
					})
						.save()
						.then(user => done(null, user));
				}
			});
		}
	)
);

//setting up facebook Strategy
passport.use(
	new FacebookStrategy(
		{
			clientID: keys.facebookAppID,
			clientSecret: keys.facebookAppSecret,
			callbackURL: '/auth/facebook/callback',
			proxy: true
		},
		(accessToken, refreshToken, profile, done) => {
			User.findOne({ facebookId: profile.id }).then(existingUser => {
				if (existingUser) {
					//user is already in our DB
					done(null, existingUser);
				} else {
					//user is not yet in our DB
					new User({
						facebookId: profile.id,
						displayName: profile.displayName
					})
						.save()
						.then(user => done(null, user));
				}
			});
		}
	)
);
