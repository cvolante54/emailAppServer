const sendgrid = require('sendgrid');
const helper = sendgrid.mail;

const keys = require('../configs/keys');

class Mailer extends helper.Mail {
	constructor({ subject, recipients }, content) {
		super(); //calls parents constructor

		this.sgApi = sendgrid(keys.sendGridKey);

		this.from_email = new helper.Email('no-reply@emaily.com');
		this.subject = subject;
		this.body = helper.Content('text/html', content);
		this.recipients = this.formatAddresses(recipients);

		this.addContent(this.body);
		this.addClickTracking();
		this.addRecipients();
	} //constructor

	formatAddresses(recipients) {
		return recipients.map(({ email }) => {
			return new helper.Email(email);
		});
	} //formatAddresses

	addClickTracking() {
		const trackingSettings = new helper.TrackingSettings();
		const clickTracking = new helper.ClickTracking(true, true);

		trackingSettings.setClickTracking(clickTracking);
		this.addTrackingSettings(trackingSettings);
	} //addClickTracking

	addRecipients() {
		const personalize = helper.Personalization();

		this.recipients.forEach(recipient => {
			personalize.addTo(recipient);
		});

		this.addPersonalization(personalize);
	} //addRecipients

	async send() {
		const request = this.sgApi.emptyRequest({
			method: 'POST',
			path: '/v3/mail/send',
			body: this.toJSON()
		});

		const response = await this.sgApi.API(request);
		return response;
	} //send
}

module.exports = Mailer;
