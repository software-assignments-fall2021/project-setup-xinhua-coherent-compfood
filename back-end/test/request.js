let assert = require("chai").assert;
let axios = require("axios");

let request_factory = (server) => {
	return async (endpoint, user_params) => {
		let params = {
			//allow all requests to succeed even if they have error status codes
			validateStatus: (status) => true
		};
		params = {...params, ...user_params};

		let resp = await axios(server.base_url + endpoint, params);
		return [resp.data, resp.status];
	};
};

module.exports = {
	assert,
	request_factory
};
