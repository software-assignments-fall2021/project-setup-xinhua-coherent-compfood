let axios = require("axios");
let express = require("express");
let morgan = require("morgan");

//dotenv loading .env
require("dotenv").config({
	silent: true
});

let server = express();

//print request info
server.use(morgan("dev"));
//parse json bodies
server.use(express.json());

//static directory is accessible as /static/ and loads files from ./public
server.use("/static/", express.static("./public/"));

server.get("/", (req, resp) => {
	let data = {
		"working": true,
		"fully_functional": false,
		"class_num": 474
	};

	return resp.json(data);
});

server.get("/foods", (req, resp) => {
	let data = [
		{
			"name": "Farook's",
			"description": "The best halal you will have in your life"
		}
	];

	return resp.json(data);
});

module.exports = server;
