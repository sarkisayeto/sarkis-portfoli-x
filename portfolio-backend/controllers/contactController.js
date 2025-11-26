const MessageContact = require('../models/MessageContact');
const { sendContactCopy } = require('../services/mailer');


async function postContact(req, res, next) {
	try {
		const { name, email, subject, message } = req.body;
		const saved = await MessageContact.create({ name, email, subject, message });

		// Fire-and-forget email sending so the API responds fast even if SMTP is slow/unreachable
		sendContactCopy({
			toAdmin: process.env.ADMIN_EMAIL,
			messageObj: { name, email, subject, message },
		})
			.then(() => {
				// optional: log success
				// console.log('Contact email sent');
			})
			.catch((mailErr) => {
				// Log but do not fail the request
				console.error('Contact email failed:', mailErr?.message || mailErr);
			});

		res.status(201).json({ success: true, message: 'Message reçu. Merci de nous avoir contactés.', data: saved });
	} catch (err) {
		next(err);
	}
}


module.exports = { postContact };