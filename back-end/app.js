let axios = require("axios");
let express = require("express");
let fs = require("fs/promises");
let morgan = require("morgan");

let config = require("./config");

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

//global variables

//TODO make sure orders can only be accessed by the user who made them, when login gets implemented
let next_order_id = 0;
let orders = {};

//this ^^^ should be avoided, but this is stopgap until mongoose -> mongodb atlas connection is made

let gen_new_order = () => {
	let order_id = next_order_id;
	++next_order_id;

	//MAGIC -1 for not defined yet
	orders[order_id] = {
		id: order_id,
		restaurant_id: -1,
		food_ids: [],
		app_id: -1
	};
	return order_id;
};

server.get("/", (req, resp) => {
	let data = {
		"working": true,
		"fully_functional": false,
		"class_num": 474
	};

	return resp.json(data);
});

server.get("/apps", async (req, resp) => {
	let data = JSON.parse(await fs.readFile("./data/new_apps"));
	resp.set("Access-Control-Allow-Origin", config.frontend_base_url);

	return resp.json(data);
});

server.get("/foods", async (req, resp) => {
	let data = JSON.parse(await fs.readFile("./data/new_foods"));
	resp.set("Access-Control-Allow-Origin", config.frontend_base_url);

	return resp.json(data);
});

server.get("/restaurants", async (req, resp) => {
	let data = JSON.parse(await fs.readFile("./data/new_restaurants"));
	resp.set("Access-Control-Allow-Origin", config.frontend_base_url);

	return resp.json(data);
});

server.post("/new_order", async (req, resp) => {
	let data = gen_new_order();
	resp.set("Access-Control-Allow-Origin", config.frontend_base_url);

	return resp.json(data);
});

server.get("/order/:order_id", async (req, resp) => {
	let order_id = Number(req.params.order_id);

	let data;

	if (orders.hasOwnProperty(order_id)){
		data = orders[order_id];
	}
	else{
		data = {"error": "Order not found"};
		resp.statusCode = 404;
	}
	resp.set("Access-Control-Allow-Origin", config.frontend_base_url);

	return resp.json(data);
});

module.exports = server;
