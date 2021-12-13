let config = {
	frontend_bind_addr: "127.0.0.1",
	frontend_bind_port: 61002,

	frontend_base_url: "http://127.0.0.1:61002",

	//have to expose on 0.0.0.0 instead of 127.0.0.1 for docker to work
	backend_bind_addr: "0.0.0.0",
	backend_bind_port: 61001,

	backend_base_url: "http://127.0.0.1:61001"
};


module.exports = config;
