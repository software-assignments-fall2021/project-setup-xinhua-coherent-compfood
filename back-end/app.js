let axios = require("axios");
//let express = require("express");
let morgan = require("morgan");

const express = require('express');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const session = require('express-session');

require('./db');

const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(session({
    secret: 'add session secret here',
    resave: false,
    saveUninitialized: true,
}));

app.set('view engine', 'hbs');

const User = mongoose.model('User');

app.get('/', (req, res) => {
    res.render('index', {user: req.session.user, home: true});
});

app.get('/login', (req, res) => {
    res.render('login');
});

app.get('/register', (req, res) => {
  res.render('register');
});

app.post('/login', (req, res) => {
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
                    res.render('error');
                }
              });
    }
    else{
        res.render('error');
    }
    });

});

app.post('/register', (req, res) => {
    // TODO: implement registration
    let flag = 0;
    
    const User = mongoose.model('User');
    User.find((err, result) => {
        for(let i = 0; i < result.length; i++){
            if(req.body.username === result[i].username){
                flag = 1;
                res.render('error');
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
    
app.listen(3000);
