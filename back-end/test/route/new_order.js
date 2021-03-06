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

	it("will return an object containing an id", async () => {
		let data = (await request("/new_order", {method: "POST"}))[0];

		assert.typeOf(data, "object");
		assert.hasAllKeys(data, ["id"]);
		assert.equal(data.id.match(/^[0-9a-f]{24}$/) !== null, true);
	});
});
