const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  first_name: { type: String, default: null },
  last_name: { type: String, default: null },
  email: { type: String, unique: true },
  password: { type: String },
  token: { type: String },
});

const MONGODB_URI = 'mongodb+srv://swe474.bimfy.mongodb.net/swe474'

 mongoose.connect(MONGODB_URI  || 'mongodb://localhost/compfood', {
       useNewUrlParser: true,
       useUnifiedTopology: true
});

module.exports = mongoose.model("user", userSchema);
