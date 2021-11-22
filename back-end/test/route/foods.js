let {assert, request_factory} = require("../request");

describe("/foods endpoint", () => {
	let server;
	let request;

	before((done) => {
		server = require("../../server");
		request = request_factory(server);
		done();
	});

	it("will have status code 200", async () => {
		assert.equal(200, (await request("/foods"))[1]);
	});

	it("will return an array of objects", async () => {
		let data = (await request("/foods"))[0];
		assert.typeOf(data, "array");

		for (let it of data){
			assert.typeOf(it, "object");
		}
	});

	it("will have exactly the expected fields in each element", async () => {
		let data = (await request("/foods"))[0];
		let expected_keys = ["id", "name", "description", "price"];

		for (let it of data){
			assert.hasAllKeys(it, expected_keys);
		}
	});
});

