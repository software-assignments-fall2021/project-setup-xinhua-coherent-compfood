let axios = require("axios");
let express = require("express");
let morgan = require("morgan");

let data = require("./data/orders.json")

let server = express();

server.get("/", (req, res) => {
	res.json(data);
})
//to put data
server.post("/newOrder", (req,res) => {
	res.send("a post request with /newOrder")
})
//to update data
server.put("/order", (req,res) => {
	res.send("a put request with /order")
})
//to delete data
server.delete("/order", (req,res) => {
	res.send("a delete request with /order")
})