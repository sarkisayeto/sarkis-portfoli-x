const nodemailer = require('nodemailer');

// Create a reusable transporter with sensible timeouts to avoid hanging requests
const transporter = nodemailer.createTransport({
	host: process.env.SMTP_HOST,
	port: Number(process.env.SMTP_PORT) || 587,
	secure: false, // STARTTLS for port 587
	auth: {
		user: process.env.SMTP_USER,
		pass: process.env.SMTP_PASS,
	},
	// Prevent long hangs if SMTP is unreachable or slow
	connectionTimeout: 10000, // 10s to establish connection
	greetingTimeout: 10000,   // 10s to receive greeting after connection
	socketTimeout: 15000,     // 15s overall socket inactivity
});


async function sendContactCopy({ toAdmin, messageObj }) {
	const { name, email, subject, message } = messageObj;

	const mailOptions = {
		from: `"Portfolio Contact" <${process.env.SMTP_USER}>`,
		to: toAdmin,
		subject: `Nouveau message de contact: ${subject}`,
		text: `Nouveau message reçu.\nNom: ${name}\nEmail: ${email}\nSujet: ${subject}\n\nMessage:\n${message}`,
		html: `<p>Nouveau message reçu depuis le formulaire de contact.</p>
<ul>
<li><strong>Nom:</strong> ${name}</li>
<li><strong>Email:</strong> ${email}</li>
<li><strong>Sujet:</strong> ${subject}</li>
</ul>
<p><strong>Message:</strong></p>
<p>${message.replace(/\n/g, '<br/>')}</p>`,
	};

	return transporter.sendMail(mailOptions);
}


module.exports = { sendContactCopy };