let axios = require("axios");
let bcrypt = require("bcrypt");
let express = require("express");
let fs = require("fs/promises");
let morgan = require("morgan");

let config = require("./config");
let jwt = require("./jwt");

//db models + objectid type
let {App, Food, ObjectId, Order, Restaurant, User} = require("./db");

//dotenv loading .env
require("dotenv").config({
	silent: true
});

let server = express();

//print request info
server.use(morgan("dev"));
//parse json bodies
server.use(express.json());

//add authentication middleware
server.use(jwt.middleware);

//add cors allow origin header before response is set
server.use((req, resp, next) => {
	resp.set("Access-Control-Allow-Origin", config.frontend_base_url);
	resp.set("Access-Control-Allow-Headers", "Content-Type,Content-Length");
	resp.set("Access-Control-Allow-Methods", "GET,POST");
	next();
});

//static directory is accessible as /static/ and loads files from ./public
server.use("/static/", express.static("./public/"));

server.options("/*", (req, resp) => {
	resp.json({});
});

server.get("/", (req, resp) => {
	let data = {
		"working": true,
		"fully_functional": false,
		"class_num": 474
	};

	return resp.json(data);
});

server.get("/__unit_test/am_i_logged_in", jwt.require_login(), (req, resp) => {
	let data = {
		"answer": true
	};

	return resp.json(data);
});

server.post("/signup", (req, resp) => {
	let username = req.body.username ?? "";
	let password = req.body.password ?? "";
	let first_name = req.body.first_name ?? "";
	let last_name = req.body.last_name ?? "";

	//check non-empty username and password
	//MAGIC minimum password length is 10
	if (username === "" || password.length < 10){
		return resp.json({error: "Username should be non-empty and password length must be at least 10"});
	}

	User.findOne(
		{username},
		(err, data) => {
			if (err){
				return resp.json({error: "Database error"});
			}

			//TODO fix race condition on username check and adding new user to db
			if (data !== null){
				return resp.json({error: "Username already exists"});
			}

			//TODO not sure what difference 1 salt round has vs 2 vs n
			let salted_hash = bcrypt.hashSync(password, 1);

			let new_user = new User({
				username,
				password: salted_hash,
				first_name,
				last_name
			});
			new_user.save();

			return resp.json({message: "Signup successful"});
		}
	);
});

server.post("/login", (req, resp) => {
	let username = req.body.username ?? "";
	let password = req.body.password ?? "";

	User.findOne(
		{username},
		(err, data) => {
			if (err || data === null){
				return resp.json({error: "Incorrect username/password"});
			}

			if (bcrypt.compareSync(password, data.password)){
				return resp.json(jwt.signer({token: {username: data.username}}));
			}
			else{
				return resp.json({error: "Incorrect username/password"});
			}
		}
	);
});

server.get("/apps/:order_id", async (req, resp) => {
	let order_id = req.params.order_id;

	//validate id format
	if (!order_id.match(/^[0-9a-f]{24}$/)){
		resp.statusCode = 400;
		return resp.json({"error": "Invalid id format"});
	}

	Order.findOne(
		{_id: order_id},
		async (err, data) => {
			if (err || data === null){
				data = {"error": "Order not found"};
				resp.statusCode = 404;

				return resp.json(data);
			}

			data = await data.populate("food_ids");
			data = data["food_ids"];

			let item_count = data.length;
			let subtotal = data.reduce(
				(accum, next) => {
					return accum + Number(next.price);
				},
				0
			);

			App.find(
				{},
				async (err, data) => {
					if (err || data === null){
						data = {"error": "App not found"};
						resp.statusCode = 404;

						return resp.json(data);
					}

					data = process_mongoose_object(data);

					//MAGIC dummy data
					for (let ele of data){
						ele["price"] = `$${(ele.price * (subtotal + 2.1)).toFixed(2)}`;
						ele["time"] = `${(ele.time * 8 + item_count * 0.2 + 1).toFixed(2)} min`;
					}

					return resp.json(data);
				}
			);
		}
	);
});

server.get("/foods/:order_id", async (req, resp) => {
	let order_id = req.params.order_id;

	//validate id format
	if (!order_id.match(/^[0-9a-f]{24}$/)){
		resp.statusCode = 400;
		return resp.json({"error": "Invalid id format"});
	}

	Order.findOne(
		{_id: order_id},
		async (err, data) => {
			if (err || data === null){
				data = {"error": "Order not found"};
				resp.statusCode = 404;

				return resp.json(data);
			}

			let restaurant_id = data.restaurant_id.length ? data.restaurant_id[0] : "";

			Restaurant.findOne(
				{_id: restaurant_id},
				async (err, data) => {
					if (err || data === null){
						data = {"error": "Restaurant not found"};
						resp.statusCode = 404;

						return resp.json(data);
					}

					data = await data.populate("menu");

					data = process_mongoose_object(data["menu"]);

					return resp.json(data);
				}
			);
		}
	);
});

server.get("/restaurants", async (req, resp) => {
	Restaurant.find(
		{},
		(err, data) => {
			if (err || data === null){
				return resp.json({error: "Server error"});
			}

			data = process_mongoose_object(data);

			return resp.json(data);
		}
	);
});

server.post("/new_order", async (req, resp) => {
	let new_order = new Order({});
	let id = (await new_order.save())._id;

	let data = {
		id: id.valueOf()
	};

	return resp.json(data);
});

let id_validator = (id) => {
	return typeof id === "string" && id.match(/^[0-9a-f]{24}$/);
};

server.post("/set_order/:order_id", async (req, resp) => {
	let order_id = req.params.order_id;

	//validate id format
	if (!order_id.match(/^[0-9a-f]{24}$/)){
		resp.statusCode = 400;
		return resp.json({"error": "Invalid id format"});
	}

	Order.findOne(
		{_id: order_id},
		async (err, data) => {
			if (err || data === null){
				data = {"error": "Order not found"};
				resp.statusCode = 404;

				return resp.json(data);
			}

			let keys = Object.keys(req.body).filter((ele) => {
				return req.body.hasOwnProperty(ele);
			});

			if (keys.indexOf("restaurant") != -1){
				let restaurant_id = req.body["restaurant"];

				if (!id_validator(restaurant_id)){
					resp.statusCode = 400;
					return resp.json({"error": "Invalid id format"});
				}

				Restaurant.findOne(
					{_id: restaurant_id},
					async (err, data) => {
						if (err || data === null){
							data = {"error": "Restaurant not found"};
							resp.statusCode = 404;

							return resp.json(data);
						}

						let new_data = await Order.findOneAndUpdate(
							{_id: order_id},
							{"restaurant_id": [restaurant_id]},
							{"new": true}
						).exec();

						new_data = process_mongoose_object(new_data);

						return resp.json(new_data);
					}
				);
			}
			//TODO no check if foods entered belong to restaurant of the order
			else if (keys.indexOf("foods") != -1){
				let food_ids = req.body["foods"];

				if (!Array.isArray(food_ids) || food_ids.some((ele) => {return !id_validator(ele);})){
					resp.statusCode = 400;
					return resp.json({"error": "Invalid id format"});
				}

				Food.find(
					{_id: food_ids},
					async (err, data) => {
						if (err || data === null || data.length !== food_ids.length){
							data = {"error": "Food(s) not found"};
							resp.statusCode = 404;

							return resp.json(data);
						}

						let new_data = await Order.findOneAndUpdate(
							{_id: order_id},
							{"food_ids": [food_ids]},
							{"new": true}
						).exec();

						new_data = process_mongoose_object(new_data);

						return resp.json(new_data);
					}
				);
			}
			else if (keys.indexOf("app") != -1){
				let app_id = req.body["app"];

				if (!id_validator(app_id)){
					resp.statusCode = 400;
					return resp.json({"error": "Invalid id format"});
				}

				App.findOne(
					{_id: app_id},
					async (err, data) => {
						if (err || data === null){
							data = {"error": "App not found"};
							resp.statusCode = 404;

							return resp.json(data);
						}

						let new_data = await Order.findOneAndUpdate(
							{_id: order_id},
							{"app_id": [app_id]},
							{"new": true}
						).exec();

						new_data = process_mongoose_object(new_data);

						return resp.json(new_data);
					}
				);
			}
			else{
				data = {"error": "Invalid body"};
				resp.statusCode = 400;

				return resp.json(data);
			}
		}
	);
});

//converts _id to string id and removes __v
let process_mongoose_object = (obj) => {
	//json dumping and loading to remove mongoose specific fields
	return process_mongoose_object_helper(JSON.parse(JSON.stringify(obj)));
};

let process_mongoose_object_helper = (obj) => {
	if (Array.isArray(obj)){
		return obj.map((ele) => {
			return process_mongoose_object(ele);
		});
	}
	else if (typeof obj === "object"){
		let ret = {};

		for (let key of Object.keys(obj)){
			if (!obj.hasOwnProperty(key)){
				continue;
			}

			if (key === "_id"){
				ret["id"] = obj[key].valueOf();
			}
			else if (key !== "__v"){
				ret[key] = process_mongoose_object(obj[key]);
			}
		}

		return ret;
	}
	else{
		return obj;
	}
};

server.get("/order/:order_id", async (req, resp) => {
	let order_id = req.params.order_id;

	//validate id format
	if (!order_id.match(/^[0-9a-f]{24}$/)){
		resp.statusCode = 400;
		return resp.json({"error": "Invalid id format"});
	}

	Order.findOne(
		{_id: order_id},
		async (err, data) => {
			if (err || data === null){
				data = {"error": "Order not found"};
				resp.statusCode = 404;

				return resp.json(data);
			}

			data = await data.populate("restaurant_id");
			data = await data.populate("food_ids");
			data = await data.populate("app_id");

			data = process_mongoose_object(data);

			return resp.json(data);
		}
	);
});

module.exports = server;
