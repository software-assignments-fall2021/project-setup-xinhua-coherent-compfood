const mongoose = require("mongoose");

const User = new mongoose.Schema({
  first_name: { type: String, default: null },
  last_name: { type: String, default: null },
  username: { type: String, unique: true },
  password: { type: String },
});

const Restaurant = new mongoose.Schema({
  name: String,
  location: String,
  menu: [String]
})

 mongoose.connect(process.env.MONGO_DB_URL || 'mongodb://localhost/compfood', {
       useNewUrlParser: true,
       useUnifiedTopology: true
});

module.exports = mongoose.model('User', User);
module.exports = mongoose.model('Restaurant, Restaurant');