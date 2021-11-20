const mongoose = require("mongoose");

const User = new mongoose.Schema({
  first_name: { type: String, default: null },
  last_name: { type: String, default: null },
  username: { type: String, unique: true },
  password: { type: String },
});

const MONGODB_URI = 'mongodb+srv://swe474.bimfy.mongodb.net/swe474'

 mongoose.connect(MONGODB_URI  || 'mongodb://localhost/compfood', {
       useNewUrlParser: true,
       useUnifiedTopology: true
});

module.exports = mongoose.model('User', User);
