const mongoose = require('mongoose');
const User = new mongoose.Schema({
    username: {type: String, required: true},
    password: {type: String, required: true},
});

mongoose.model('User', User);

const MONGODB_URI = 'mongodb+srv://Stein:SoulEater@anianidb.wrcau.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'

 mongoose.connect(MONGODB_URI  || 'mongodb://localhost/compfood', {
       useNewUrlParser: true,
       useUnifiedTopology: true
});
