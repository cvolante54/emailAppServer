const mongoose = require('mongoose');
const passport = require('passport');
const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');

const Survey = mongoose.model('surveys');
module.exports = app => {
	// app.get('/api/surveys', requireLogin, (req,res) => {
	//
	//
	// });

	app.post('/api/surveys', requireLogin, requireCredits, (req, res) => {
		const { title, subject, body, recipients } = reqq.body;

		const survey = new Survey({
			title,
			subject,
			body,
			recipients: recipients.split(',').map(email => {
				return { email: email.trim() };
			}),
			_user: req.user.id,
			dateSent: Date.now()
		});

		//send emails

		//save survey
	});

	// app.post('/api/surveys/webhooks', (req,res) {
	//
	// });
};
