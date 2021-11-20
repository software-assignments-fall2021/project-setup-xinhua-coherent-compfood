let jwt_lib = require("jsonwebtoken");
let passport = require("passport");
let passport_jwt = require("passport-jwt");

//dotenv loading .env
require("dotenv").config({
	silent: true
});

let {User} = require("./db");



let middleware = passport.initialize();

let jwt_options = {
	secretOrKey: process.env.JWT_SECRET,
	jwtFromRequest: passport_jwt.ExtractJwt.fromAuthHeaderAsBearerToken()
};

let signer = (user_info) => {
	return jwt_lib.sign(user_info, jwt_options.secretOrKey);
};

let verifier = (jwt, done) => {
	User.findOne(
		{username: jwt.username},
		(err, data) => {
			if (err || data === null){
				return done(err, undefined);
			}
			return done(null, data);
		}
	);
};

passport.use(new passport_jwt.Strategy(jwt_options, verifier));

let require_login = () => {
	return passport.authenticate("jwt", {session: false});
};

module.exports = {
	signer,
	middleware,
	require_login
};
