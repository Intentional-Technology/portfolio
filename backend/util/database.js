const config = require("../config/configAdapter").config;
const { MongoClient } = require("mongodb");
const uri =
	"mongodb+srv://" +
	config.get("mongodb.username") +
	":" +
	config.get("mongodb.password") +
	"@" +
	config.get("mongodb.host") +
	"/balancedbeing?retryWrites=true&w=majority";
let database;

function connectToDatabase() {
	database = new MongoClient(uri);
	return database.connect();
}

function recordSubscription(name, email, zipcode) {
	return database.db("balancedbeing").collection("subscribers").insertOne({
		name: name,
		email: email,
		zipcode: zipcode,
		createdAt: new Date(),
	});
}

module.exports = {
	connectToDatabase: () =>
		Promise.resolve().then((unused) => connectToDatabase()),
	recordSubscription: recordSubscription,
};
