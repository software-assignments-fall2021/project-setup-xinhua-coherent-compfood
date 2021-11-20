const mongoose = require("mongoose");

const User = new mongoose.Schema({

  username: { type: String, unique: true },
  password: { type: String }
});

const MONGODB_URI = 'mongodb+srv://swe474.bimfy.mongodb.net/swe474'

 mongoose.connect(process.env.MONGO_DB_URL  || 'mongodb://localhost/compfood', {
       useNewUrlParser: true,
       useUnifiedTopology: true
});

module.exports = mongoose.model('User', User);

