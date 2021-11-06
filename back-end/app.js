let axios = require("axios");
let express = require("express");
let fs = require("fs/promises");
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

server.get("/apps", async (req, resp) => {
	let data = JSON.parse(await fs.readFile("./data/apps"));
	resp.set("Access-Control-Allow-Origin", process.env.client_base_url);

	return resp.json(data);
});

server.get("/foods", async (req, resp) => {
	let data = JSON.parse(await fs.readFile("./data/foods"));
	resp.set("Access-Control-Allow-Origin", process.env.client_base_url);

	return resp.json(data);
});

server.get("/restaurants", async (req, resp) => {
	let data = JSON.parse(await fs.readFile("./data/restaurants"));
	resp.set("Access-Control-Allow-Origin", process.env.client_base_url);

	return resp.json(data);
});

module.exports = server;
