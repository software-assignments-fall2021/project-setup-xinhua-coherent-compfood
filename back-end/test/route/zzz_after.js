let {assert, request_factory} = require("../request");

describe("Unit test cleanup", () => {
	let server;

	before((done) => {
		server = require("../../server");
		done();
	});

	it("should clean up server", async () => {
		server.stop();
		assert.equal(true, true);
	});
});
