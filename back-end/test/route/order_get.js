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

	it("will have status code 200", async () => {
		order_id = (await request("/new_order", {method: "POST"}))[0].id;

		assert.equal(200, (await request(`/order/${order_id}`))[1]);
	});

	it("will return an object", async () => {
		let data = (await request(`/order/${order_id}`))[0];
		assert.typeOf(data, "object");
	});

	it("will have exactly the expected fields", async () => {
		let data = (await request(`/order/${order_id}`))[0];
		let expected_keys = ["restaurant_id", "food_ids", "app_id"];

		assert.hasAllKeys(data, expected_keys);
	});

	it("will have the correct types for each field", async () => {
		let data = (await request(`/order/${order_id}`))[0];

		//TODO should really be a single element but need to figure out how to make a "null id"
		assert.typeOf(data["restaurant_id"], "array");
		for (let it of data["restaurant_id"]){
			assert.equal(it.match(/^[0-9a-f]{24}$/) !== null, true);
		}

		assert.typeOf(data["food_ids"], "array");
		for (let it of data["food_ids"]){
			assert.typeOf(it, "number");
		}

		assert.typeOf(data["app_id"], "array");
		for (let it of data["app_id"]){
			assert.equal(it.match(/^[0-9a-f]{24}$/) !== null, true);
		}
	});

	it("will have status code 404 for non-existant order_id", async () => {
		assert.equal(404, (await request("/order/0123456789abcdef01234567"))[1]);
	});

	it("will have status code 400 for invalid order_id format", async () => {
		assert.equal(400, (await request("/order/invalid_id_lol"))[1]);
	});
});

