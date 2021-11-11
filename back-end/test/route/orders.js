let {assert, request_factory} = require("../request");

describe("/orders endpoint", () => {
	let server;
	let request;

	before((done) => {
		server = require("../../server");
		request = request_factory(server);
		done();
	});

	it("will have status code 200", async () => {
		assert.equal(200, (await request("/orders"))[1]);
	});

	it("will return an array of objects", async () => {
		let data = (await request("/orders"))[0];
		assert.typeOf(data, "array");

		for (let it of data){
			assert.typeOf(it, "object");
		}
	});

	it("will have exactly the expected fields in each element", async () => {
		let data = (await request("/apps"))[0];
		let expected_keys = ["id", "first_name", "last_name","email","gender","date", "order"];

		for (let it of data){
			assert.hasAllKeys(it, expected_keys);
		}
	});
});

