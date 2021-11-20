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


server.post("/signUp", async (req, res) => {
  try {
    // Get user input
    const { first_name, last_name, email, password } = req.body;
  
    // Validate user input
    if (!(email && password && first_name && last_name)) {
      res.status(400).send("All input is required");
    }

      // check if user already exist
      
   // Validate if user exist in our database
   const oldUser = await User.findOne({ email });
 
   if (oldUser) {
     return res.status(409).send("User Already Exist. Please Login");
   }

  
    
  } catch (err) {
    console.log(err);
  }
 });
 











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