let assert = require("chai").assert;
let axios = require("axios");

let request_factory = (server) => {
	return async (...args) => {
		let resp = await axios(server.base_url + args[0], ...args.slice(1));
		return [resp.data, resp.status];
	};
};

module.exports = {
	assert,
	request_factory
};
