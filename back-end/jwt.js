let jwt_lib = require("jsonwebtoken");
let passport = require("passport");
let passport_jwt = require("passport-jwt");

//dotenv loading .env
require("dotenv").config({
	silent: true
});

let {User} = require("./db");



let running_unit_tests = process.env.UNIT_TESTING === "1";

let middleware = passport.initialize();

let jwt_options = {
	secretOrKey: running_unit_tests ? "SECRET FOR UNIT TESTING PURPOSES ONLY" : process.env.JWT_SECRET,
	jwtFromRequest: passport_jwt.ExtractJwt.fromAuthHeaderAsBearerToken(),
	//preemptively mitigate algorithm swapping attack
	algorithms: ["HS256"]
};

let signer = (user_info) => {
	return jwt_lib.sign(user_info, jwt_options.secretOrKey);
};

let verifier = (jwt, done) => {
	let token = jwt.token;

	User.findOne(
		{username: token.username},
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
