let axios = require("axios");
let express = require("express");
let fs = require("fs/promises");
let morgan = require("morgan");

const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const session = require('express-session');

require('./db');

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

server.use(bodyParser.urlencoded({extended: true}));
server.use(session({
    secret: 'add session secret here',
    resave: false,
    saveUninitialized: true,
}));

server.set('view engine', 'hbs');

const User = mongoose.model('User');

server.get('/', (req, res) => {
    res.render('index', {user: req.session.user, home: true});
});

server.get('/login', (req, res) => {
    res.render('login');
});

server.get('/register', (req, res) => {
  res.render('register');
});

server.post('/login', (req, res) => {
    // TODO: implement login
    User.findOne({username: req.body.username}, (err, user) => {
        if (!err && user) {
            bcrypt.compare(req.body.password, user.password, (err, passwordMatch) => {
                // regenerate session if passwordMatch is true
                if(passwordMatch){
                    req.session.regenerate((err) => {
                        if (!err) {
                        req.session.user = user;
                        res.redirect('/');
                        } else {
                        console.log('error'); 
                        res.send('an error occurred, please see the server logs for more information');
                        }
                    });
                }
                else{
                    res.render('error', {message: 'Incorrect login credentials'});
                }
            });
    	}
    	else{
        	res.render('error');
    	}
	});
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


server.post('/register', (req, res) => {
    // TODO: implement registration
    let flag = 0;
    
    const User = mongoose.model('User');
    User.find((err, result) => {
        for(let i = 0; i < result.length; i++){
            if(req.body.username === result[i].username){
                flag = 1;
                res.render('error', {message: 'Username must be more than 8 characters' });
            }
        } 
        
        if(req.body.password.length < 8){
            if(flag === 0){
                flag = 1;
                res.render('error');
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

                req.session.regenerate((err) => {
                    if (!err) {
                    req.session.user = user;
                    } else {
                    console.log('error'); 
                    res.send('an error occurred, please see the server logs for more information');
                    }
                  });
                user.save(() => { 
                    res.redirect('/');	
                });
            });
        }   
    });
});
    
module.exports = server;
