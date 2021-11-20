let axios = require("axios");
let fs = require("fs/promises");
let morgan = require("morgan");

const mongoose = require('mongoose');
const bodyParser = require('body-parser');
  
require("dotenv").config({
 silent: true
});
 
const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
 
require('./db');
const User = mongoose.model('User');
const {verify} = require('./middleware')

const server = express();
 
server.use(bodyParser.urlencoded({extended: true}));
const cookieParser = require('cookie-parser')
server.use(cookieParser())

server.use(express.json({ limit: "50mb" }));


server.post('/signUp', (req, res) => {
  let flag = 0;
  console.log('hi')
  const User = mongoose.model('User');
  User.find((err, result) => {
      for(let i = 0; i < result.length; i++){
          if(req.body.username === result[i].username){
              flag = 1;
              let message = 'Username already exists, please login'
              res.status(200).send(message);
    }
      } 
      
      if(req.body.password.length < 8){
          if(flag === 0){
              flag = 1;
              let message = 'Pasword is not long enough, please try again'
              res.status(200).send(message);
    }
      }

      if(flag === 0){
          const myPlaintextPassword = req.body.password;
          const saltRounds = 10;
          bcrypt.hash(myPlaintextPassword, saltRounds, function(err, hash) {
              const user = new User({
                  username: req.body.username,
                  password: hash
              });
              user.save(() => {  
                  res.redirect('/');	
              });
          });
      }   
  });
});
 
 server.post('/signIn', (req, res) => {
	User.findOne({username: req.body.username}, (err, user) => {
        if (!err && user) {
            bcrypt.compare(req.body.password, user.password, (err, passwordMatch) => {
                if(passwordMatch){
                        if (!err) {
						              curruntuser = req.body.username;
					              	let accessToken = jwt.sign({user: user}, process.env.ACCESS_TOKEN_SECRET, {expiresIn: "30s"})
						              res.cookie("jwt", accessToken, {secure: true, httpOnly: true})
                          res.redirect('/');
                        } else {
                        console.log('error'); 
                        res.send('an error occurred, please see the server logs for more information');
                        }
                }
                else{
                	let message = 'Incorrect password, please try again'
                  res.status(200).send(message);
                }
              });
    }
    else{
		let message = 'Username does not exsist, please register'
    res.status(200).send(message);
    }
    });

});
 
 //server.get("/welcome", auth, (req, res) => {
 // res.status(200).send("Welcome 🙌 ");
 //});

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