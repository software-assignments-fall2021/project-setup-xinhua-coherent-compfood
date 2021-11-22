const mongoose = require("mongoose");
const {MongoMemoryServer} = require("mongodb-memory-server");

//dotenv loading .env
require("dotenv").config({
	silent: true
});

const User = new mongoose.Schema({
	first_name: { type: String, default: null },
	last_name: { type: String, default: null },
	username: { type: String, unique: true },
	password: { type: String },
});

const Food = new mongoose.Schema({
	name: { type: String, default: null },
	price: { type: Number, default: 0 },
});

const Restaurant = new mongoose.Schema({
	name: {type: String, default: null},
	menu: [Food]
});

const Restaurants = new mongoose.Schema({
	restaurants: [Restaurant]
});




//async iife
(async () => {

let running_unit_tests = process.env.UNIT_TESTING === "1";

if (!running_unit_tests){
	mongoose.connect(
		process.env.MONGO_DB_URL,
		{
			user: process.env.MONGO_DB_USERNAME,
			pass: process.env.MONGO_DB_PASSWORD,
			useNewUrlParser: true,
			useUnifiedTopology: true
		}
	);
}
else{
	let mock_mongodb = await MongoMemoryServer.create();

	mongoose.connect(
		mock_mongodb.getUri(),
		{
			useNewUrlParser: true,
			useUnifiedTopology: true
		}
	);

	//timeout mongoose connection after 4 sec so mocha doesn't hang
	setTimeout(
		async () => {
			mongoose.disconnect()
			await mock_mongodb.stop();
		},
		4000
	);
}

})();

module.exports = {
	User: mongoose.model("User", User),
	Restaurant: mongoose.model("Restaurant", Restaurant),
	Food: mongoose.model("Food", Food),
	Restaurants: mongoose.model("Restaurants", Restaurants)
};
