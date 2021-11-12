let {assert, request_factory} = require("../request");

describe("/restaurants endpoint", () => {
	let server;
	let request;

	before((done) => {
		server = require("../../server");
		request = request_factory(server);
		done();
	});

	//TODO for some reason refused to work uncommented
	//after(() => {
	//	server.stop();
	//});

	it("will have status code 200", async () => {
		assert.equal(200, (await request("/restaurants"))[1]);
	});

	it("will return an array of objects", async () => {
		let data = (await request("/restaurants"))[0];
		assert.typeOf(data, "array");

		for (let it of data){
			assert.typeOf(it, "object");
		}
	});

	it("will have exactly the expected fields in each element", async () => {
		let data = (await request("/restaurants"))[0];
		let expected_keys = ["id", "name", "description", "hour_start", "hour_end", "location"];

		for (let it of data){
			assert.hasAllKeys(it, expected_keys);
		}
	});
});

