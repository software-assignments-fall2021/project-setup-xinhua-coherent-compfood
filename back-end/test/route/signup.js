let {assert, request_factory} = require("../request");

describe("/signup endpoint", () => {
	let server;
	let request;

	before((done) => {
		server = require("../../server");
		request = request_factory(server);
		done();
	});

	it("will have status code 200", async () => {
		assert.equal(200, (await request("/signup", {method: "POST"}))[1]);
	});

	it("will return a successful message for valid sign up", async () => {
		let body = {
			username: "michael",
			password: "long enough"
		};
		let data = (await request("/signup", {method: "POST", data: body}))[0];

		assert.typeOf(data, "object");
		assert.hasAllKeys(data, ["message"]);
	});

	it("will return an error for duplicate username", async () => {
		let body = {
			username: "michael",
			password: "another one"
		};
		let data = (await request("/signup", {method: "POST", data: body}))[0];

		assert.typeOf(data, "object");
		assert.hasAllKeys(data, ["error"]);
	});

	it("will return an error for too short password", async () => {
		let body = {
			username: "unique username",
			password: "abc"
		};
		let data = (await request("/signup", {method: "POST", data: body}))[0];

		assert.typeOf(data, "object");
		assert.hasAllKeys(data, ["error"]);
	});

	it("will return an error for empty username", async () => {
		let body = {
			password: "123456789abcdef"
		};
		let data = (await request("/signup", {method: "POST", data: body}))[0];

		assert.typeOf(data, "object");
		assert.hasAllKeys(data, ["error"]);
	});
});
