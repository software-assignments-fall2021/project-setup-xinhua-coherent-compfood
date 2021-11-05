const mongoose = require('mongoose');
const User = new mongoose.Schema({
    username: {type: String, required: true},
    password: {type: String, required: true},
});

mongoose.model('User', User);
mongoose.connect('mongodb://localhost/compfood');