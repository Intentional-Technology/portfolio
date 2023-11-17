const { recordSubscription } = require("../util/database");
const { sendSubscriptionNotificationEmail } = require("../util/nodemailer");
const { subscribeToEmails } = require("../util/mailchimp");

function handleCheckoutCompleted(name, email, zipcode) {
  // Add to mailchimp subscription
  return subscribeToEmails(name, email)
    .then((unused) => {
      // Email me to notify
      sendSubscriptionNotificationEmail(name, email);
    })
    .then((unused) => {
      // Add to database
      recordSubscription(name, email, zipcode);
    });
}

module.exports = { handleCheckoutCompleted };
