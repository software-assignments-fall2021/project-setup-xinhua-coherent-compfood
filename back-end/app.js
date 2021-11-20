let axios = require("axios");
let fs = require("fs/promises");
let morgan = require("morgan");

const mongoose = require('mongoose');
const bodyParser = require('body-parser');
  
require("dotenv").config({
 silent: true
});
 
require("./config/database").connect();
const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
 
require('./db');

server.use(bodyParser.urlencoded({extended: true}));
const cookieParser = require('cookie-parser')
server.use(cookieParser())

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

     //Encrypt user password
     encryptedPassword = await bcrypt.hash(password, 10);

  // Create user in our database
  const user = await User.create({
    first_name,
    last_name,
    email: email.toLowerCase(), // sanitize: convert email to lowercase
    password: encryptedPassword,
  });

  // Create token
  const token = jwt.sign(
    { user_id: user._id, email },
    process.env.TOKEN_KEY,
    {
      expiresIn: "2h",
    }
  );
  // save user token
  user.token = token;

    // return new user
    res.status(201).json(user);
    
  } catch (err) {
    console.log(err);
  }
 });
 
 app.post('/login', (req, res) => {
	User.findOne({username: req.body.username}, (err, user) => {
        if (!err && user) {
            bcrypt.compare(req.body.password, user.password, (err, passwordMatch) => {
                if(passwordMatch){
                        if (!err) {
						curruntuser = req.body.username;
						let accessToken = jwt.sign({user: user}, process.env.ACCESS_TOKEN_SECRET, {expiresIn: "30s"})

						res.cookie("jwt", accessToken, {secure: true, httpOnly: true})
                        res.redirect('/home');
                        } else {
                        console.log('error'); 
                        res.send('an error occurred, please see the server logs for more information');
                        }
                }
                else{
                	let message = 'Incorrect password, please try again'

                }
              });
    }
    else{
		let message = 'Username does not exsist, please register'

    }
    });

});
 
 server.get("/welcome", auth, (req, res) => {
  res.status(200).send("Welcome 🙌 ");
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
    
 
// This should be the last route else any after it won't work
 
 
server.use("*", (req, res) => {
  res.status(404).json({
    success: "false",
    message: "Page not found",
    error: {
    statusCode: 404,
    message: "You reached a route that is not defined on this server",
    },
  });
 });
 


module.exports = server;