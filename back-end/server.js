let app = require("./app");

//have to expose on 0.0.0.0 instead of 127.0.0.1 for docker to work
let listen_addr = "0.0.0.0";
let listen_port = 61001;

let server = app.listen(listen_port, listen_addr, () => {
	console.log(`Backend available at http://${listen_addr}:${listen_port}`);
});

module.exports = {
	stop: () => {
		server.close();
	},
	base_url: `http://${listen_addr}:${listen_port}`
};
