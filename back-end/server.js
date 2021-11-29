let app = require("./app");
let config = require("./config");

let server = app.listen(config.backend_bind_port, config.backend_bind_addr, () => {
	console.log(`Backend available at ${config.backend_base_url}`);
});

module.exports = {
	stop: () => {
		server.close();
	},
	base_url: config.backend_base_url
};