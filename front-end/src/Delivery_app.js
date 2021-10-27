import {useState, useEffect} from "react";
import {BrowserRouter, Switch, Route, Link} from "react-router-dom";

let Delivery_app = (props) => {
	let get_order_id = () => {
		//TODO actually get the id from the url path
		return "test_order_id";
	};

	return (
		<div>
			<p>{props.name}</p>
			<p>Total: {props.price}</p>
			<p>Estimated time to deliver: {props.time}</p>
			<a href={`/processing/${get_order_id()}`}>ORDER</a>
		</div>
	);
};

export default Delivery_app;
