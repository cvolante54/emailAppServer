const passport = require('passport');
const keys = require('../configs/keys');
const stripe = require('stripe')(keys.stripeSecretKey);
const requireLogin = require('../middlewares/requireLogin');

module.exports = app => {
	app.post('/api/stripe', requireLogin, async (req, res) => {
		const charge = await stripe.charges.create({
			amount: 500,
			currency: 'usd',
			source: req.body.id, // obtained with Stripe.js
			description: '$5 for 5 credits'
		});
		console.log(charge);

		//edit userSchema
		req.user.credits += 5;
		const user = await req.user.save();

		//responce
		res.send(user);
	});
};
