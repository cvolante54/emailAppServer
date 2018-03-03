const passport = require('passport');

module.exports = app => {
	//======== Google =========
	app.get(
		'/auth/google',
		passport.authenticate('google', {
			scope: ['profile', 'email']
		})
	);

	app.get(
		'/auth/google/callback',
		passport.authenticate('google', { failureRedirect: '/login' }),
		(req, res) => {
			// Successful authentication, redirect home.
			res.redirect('/surveys');
		}
	);

	//======= Facebook ==========
	app.get('/auth/facebook', passport.authenticate('facebook'));

	app.get(
		'/auth/facebook/callback',
		passport.authenticate('facebook', { failureRedirect: '/login' }),
		(req, res) => {
			// Successful authentication, redirect home.
			res.redirect('/surveys');
		}
	);

	app.get('/api/logout', (req, res) => {
		req.logout();
		res.redirect('/');
	});

	app.get('/api/current_user', (req, res) => {
		res.send(req.user);
	});
};
