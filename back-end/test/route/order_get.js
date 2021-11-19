let {assert, request_factory} = require("../request");

describe("/order/:order_id GET endpoint", () => {
	let server;
	let request;
	let order_id;

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
		order_id = (await request("/new_order", {method: "POST"}))[0];

		assert.equal(200, (await request(`/order/${order_id}`))[1]);
	});

	it("will return an object", async () => {
		let data = (await request(`/order/${order_id}`))[0];
		assert.typeOf(data, "object");
	});

	it("will have exactly the expected fields", async () => {
		let data = (await request(`/order/${order_id}`))[0];
		let expected_keys = ["id", "restaurant_id", "food_ids", "app_id"];

		assert.hasAllKeys(data, expected_keys);
	});

	it("will have the correct types for each field", async () => {
		let data = (await request(`/order/${order_id}`))[0];

		assert.typeOf(data["id"], "number");

		assert.typeOf(data["restaurant_id"], "number");

		assert.typeOf(data["food_ids"], "array");
		for (let it of data["food_ids"]){
			assert.typeOf(it, "number");
		}

		assert.typeOf(data["app_id"], "number");
	});
});

