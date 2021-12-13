const {MongoMemoryServer} = require("mongodb-memory-server");
const mongoose = require("mongoose");

//dotenv loading .env
require("dotenv").config({
	silent: true
});

const App = new mongoose.Schema({
	name: { type: String, default: null },
	//multiplier
	price: { type: Number, default: 1.0 },
	//multiplier
	time: { type: Number, default: 1.0 }
});

const Order = new mongoose.Schema({
	//this is an array of ids because otherwise new Order(...) doesn't add this key
	restaurant_id: [{ type: mongoose.ObjectId, ref: "Restaurant" }],
	food_ids: [{ type: mongoose.ObjectId, ref: "Food" }],
	//see comment above restaurant_id
	app_id: [{ type: mongoose.ObjectId, ref: "App" }]
});

const User = new mongoose.Schema({
	first_name: { type: String, default: null },
	last_name: { type: String, default: null },
	username: { type: String, unique: true },
	password: { type: String },
	order_ids: [{ type: mongoose.ObjectId, ref: "Order" }]
});

const Food = new mongoose.Schema({
	name: { type: String, default: null },
	description: { type: String, default: null },
	price: { type: String, default: 0 }
});

const Restaurant = new mongoose.Schema({
	name: { type: String, default: null },
	description: { type: String, default: null },
	hour_start: { type: String, default: null },
	hour_end: { type: String, default: null },
	location: { type: String, default: null },
	menu: [{ type: mongoose.ObjectId, ref: "Food" }]
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
	Order: mongoose.model("Order", Order),
	App: mongoose.model("App", App),

	ObjectId: mongoose.Types.ObjectId
};
