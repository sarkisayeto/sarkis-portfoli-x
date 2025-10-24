const nodemailer = require('nodemailer');


const transporter = nodemailer.createTransport({
host: process.env.SMTP_HOST,
port: Number(process.env.SMTP_PORT) || 587,
secure: false,
auth: {
user: process.env.SMTP_USER,
pass: process.env.SMTP_PASS
}
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
<p>${message.replace(/\n/g, '<br/>')}</p>`
};


return transporter.sendMail(mailOptions);
}


module.exports = { sendContactCopy };