const config = require("../config/configAdapter").config;
const nodemailer = require("nodemailer");

const gmailTransport = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: config.get("nodemailer.port"),
  secure: true,
  auth: {
    user: config.get("nodemailer.user"),
    pass: config.get("nodemailer.password"),
  },
});

function sendEmail(senderName, subject, message) {
  return gmailTransport.sendMail({
    from: {
      name: senderName,
      address: "info@intentionaltechnology.net",
    },
    to: "amanda@intentionaltechnology.net",
    subject: subject,
    text: message,
  });
}

function sendContactNotificationEmail(name, email, message) {
  return sendEmail(
    "Intentional Technology",
    "Intentional Technology Inquiry",
    `User ${name} with email ${email} sent this message:\n${message}`,
  );
}

function sendSubscriptionNotificationEmail(name, email) {
  return sendEmail(
    "Balanced Being",
    "New Balanced Being Subscription",
    `User ${name} with email ${email} just subscribed for Balanced Being`,
  );
}

module.exports = {
  sendContactNotificationEmail,
  sendSubscriptionNotificationEmail,
};
