let axios = require("axios");
let fs = require("fs/promises");
let morgan = require("morgan");

const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const passport = require("passport")
 
//require('./db');
 
require("dotenv").config({
 silent: true
});
 
 
//const User = mongoose.model('User');
 
 
//require("dotenv").config();
require("./config/database").connect();
const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
 
const User = require("./model/user");
const auth = require("./middleware/auth");
 
const server = express();
 
server.use(express.json({ limit: "50mb" }));














server.get("/apps", async (req, resp) => {
	let data = JSON.parse(await fs.readFile("./data/new_apps"));
	resp.set("Access-Control-Allow-Origin", process.env.client_base_url);

	return resp.json(data);
});

server.get("/foods", async (req, resp) => {
	let data = JSON.parse(await fs.readFile("./data/new_foods"));
	resp.set("Access-Control-Allow-Origin", process.env.client_base_url);

	return resp.json(data);
});

server.get("/restaurants", async (req, resp) => {
	let data = JSON.parse(await fs.readFile("./data/new_restaurants"));
	resp.set("Access-Control-Allow-Origin", process.env.client_base_url);

	return resp.json(data);
});
    



module.exports = server;