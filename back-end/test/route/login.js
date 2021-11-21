let {assert, request_factory} = require("../request");

describe("/login endpoint", () => {
	let server;
	let request;
	let jwt;

	let credentials = {
		username: "test /login endpoint",
		password: "some random password"
	};

	before((done) => {
		server = require("../../server");
		request = request_factory(server);
		done();
	});

	it("will have status code 200", async () => {
		assert.equal(200, (await request("/login", {method: "POST"}))[1]);
	});

	it("will return a token for valid log in", async () => {
		await request("/signup", {method: "POST", data: credentials});

		let data = (await request("/login", {method: "POST", data: credentials}))[0];
		jwt = data;

		//extract payload from jwt and convert base64 -> json string -> object
		data = JSON.parse(Buffer.from(jwt.split(".")[1], "base64").toString());

		assert.typeOf(data, "object");
		assert.hasAllKeys(data, ["token", "iat"]);
	});

	it("will return an error for incorrect username", async () => {
		let data = (await request("/login", {method: "POST", data: {...credentials, username: "no such username"}}))[0];

		assert.typeOf(data, "object");
		assert.hasAllKeys(data, ["error"]);
	});

	it("will return an error for incorrect password", async () => {
		let data = (await request("/login", {method: "POST", data: {...credentials, password: "wrong password"}}))[0];

		assert.typeOf(data, "object");
		assert.hasAllKeys(data, ["error"]);
	});

	it("will allow access to login-protected route", async () => {
		let data = (await request("/__unit_test/am_i_logged_in", {headers: {"Authorization": `Bearer ${jwt}`}}))[0];

		assert.typeOf(data, "object");
		assert.hasAllKeys(data, ["answer"]);
		assert.equal(data["answer"], true);
	})
});
