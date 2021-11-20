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



const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('./db');
const jwt = require('jsonwebtoken')
server.use(bodyParser.urlencoded({extended: true}));
const cookieParser = require('cookie-parser')
server.use(cookieParser())

const {verify} = require('./middleware')

server.set('view engine', 'hbs');

server.use(express.urlencoded({extended:false}));

const User = mongoose.model('User');
var curruntuser


server.get('/', (req, res) => {
    res.render('index', {user: curruntuser, home: true});
});


server.get('/login', (req, res) => {
    res.render('login');
});

server.get('/register', (req, res) => {
  res.render('register');
});



server.post('/login', (req, res) => {
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
        			res.render('error', {message: message});
                }
              });
    }
    else{
		let message = 'Username does not exsist, please register'
        res.render('error', {message: message});
    }
    });

});

server.post('/register', (req, res) => {
    let flag = 0;
    console.log('HIIIII', req.body.password)
    //const User = mongoose.model('User');
    console.log("HELLOOO")
    User.find((err, result) => {
        console.log("HELLOOO")
        for(let i = 0; i < result.length; i++){
            if(req.body.username === result[i].username){
                flag = 1;
				let message = 'Username already exists, please login'
                res.render('error', {message: message});
            }
        } 
        
        if(req.body.password.length < 8){
            if(flag === 0){
                flag = 1;
				let message = 'Pasword is not long enough, please try again'
                res.render('error', {message: message});
            }
        }

        if(flag === 0){
            console.log("HELLOOO")
            const myPlaintextPassword = req.body.password;
            const saltRounds = 10;
            bcrypt.hash(myPlaintextPassword, saltRounds, function(err, hash) {
                const user = new User({
                    username: req.body.username,
                    password: hash
                });
                user.save(() => {  
                    console.log("hi")
                    res.redirect('/');	
                });
            });
        }   
    });
});



server.get("/apps", async (req, resp) => {
    try {
	let data = JSON.parse(await fs.readFile("./data/new_apps"));
	resp.set("Access-Control-Allow-Origin", config.frontend_base_url);

	return resp.json(data);
} catch (err) {
    next(err);
  }
});

server.get("/foods", async (req, resp) => {
    try {
	let data = JSON.parse(await fs.readFile("./data/new_foods"));
	resp.set("Access-Control-Allow-Origin", config.frontend_base_url);

	return resp.json(data);
} catch (err) {
    next(err);
  }
});

server.get("/restaurants", async (req, resp) => {
    try {
	let data = JSON.parse(await fs.readFile("./data/new_restaurants"));
	resp.set("Access-Control-Allow-Origin", config.frontend_base_url);

	return resp.json(data);
} catch (err) {
    next(err);
  }
});


    
module.exports = server;
