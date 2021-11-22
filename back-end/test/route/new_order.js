let {assert, request_factory} = require("../request");

describe("/new_order endpoint", () => {
	let server;
	let request;

	before((done) => {
		server = require("../../server");
		request = request_factory(server);
		done();
	});

	it("will have status code 200", async () => {
		assert.equal(200, (await request("/new_order", {method: "POST"}))[1]);
	});

	it("will return a number", async () => {
		let data = (await request("/new_order", {method: "POST"}))[0];
		assert.typeOf(data, "number");
	});
});
