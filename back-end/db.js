const mongoose = require('mongoose');
const User = new mongoose.Schema({
    username: {type: String, required: true},
    password: {type: String, required: true},
});

mongoose.model('User', User);

const MONGODB_URI = 'mongodb+srv://swe474.bimfy.mongodb.net/swe474'

 mongoose.connect(MONGODB_URI  || 'mongodb://localhost/compfood', {
       useNewUrlParser: true,
       useUnifiedTopology: true
});
