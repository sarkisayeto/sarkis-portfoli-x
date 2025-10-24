const MessageContact = require('../models/MessageContact');
const { sendContactCopy } = require('../services/mailer');


async function postContact(req, res, next) {
try {
const { name, email, subject, message } = req.body;
const saved = await MessageContact.create({ name, email, subject, message });


try {
await sendContactCopy({ toAdmin: process.env.ADMIN_EMAIL, messageObj: { name, email, subject, message } });
} catch (mailErr) {
return res.status(201).json({ success: true, message: 'Message enregistré, mais l’envoi de l’email a échoué.', data: saved, mailError: mailErr.message });
}


res.status(201).json({ success: true, message: 'Message reçu et envoyé à l’administrateur.', data: saved });
} catch (err) { next(err); }
}


module.exports = { postContact };