const mongoose = require("mongoose");

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

mongoose.connect(
	process.env.MONGO_DB_URL,
	{
		user: process.env.MONGO_DB_USERNAME,
		pass: process.env.MONGO_DB_PASSWORD,
		useNewUrlParser: true,
		useUnifiedTopology: true
	}
);

module.exports = {
	User: mongoose.model("User", User)
};
