let app = require("./app");

let listen_addr = "127.0.0.1";
let listen_port = 61001;

let server = app.listen(listen_port, listen_addr, () => {
	console.log(`Backend available at http://${listen_addr}:${listen_port}`);
});

module.exports = {
	stop: () => {
		server.close();
	}
};
