const mailchimp = require("@mailchimp/mailchimp_marketing");
const config = require("../config/configAdapter").config;
const { createHash } = require("crypto");

mailchimp.setConfig({
	apiKey: config.get("mailchimp.apiKey"),
	server: config.get("mailchimp.serverPrefix"),
});

function subscribeToEmails(name, email) {
	return mailchimp.lists.setListMember(
		config.get("mailchimp.audienceListId"),
		createHash("md5").update(email.toLowerCase()).digest("hex"),
		{
			email_address: email,
			status: "subscribed",
			merge_fields: {
				FNAME: name,
			},
		},
	);
}

module.exports = { subscribeToEmails };
