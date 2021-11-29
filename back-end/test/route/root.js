let {assert, request_factory} = require("../request");

describe("/ endpoint", () => {
	let server;
	let request;

	before((done) => {
		server = require("../../server");
		request = request_factory(server);
		done();
	});

	after(() => {
		server.stop();
	});

	it("will have status code 200", async () => {
		assert.equal(200, (await request("/"))[1]);
	});

	it("will return an object", async () => {
		assert.typeOf((await request("/"))[0], "object");
	});

	it("will have exactly the expected fields", async () => {
		let data = (await request("/"))[0];
		let expected_keys = ["working", "fully_functional", "class_num"];

		assert.hasAllKeys(data, expected_keys);
	});
});
