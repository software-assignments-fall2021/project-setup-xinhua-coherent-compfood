import {useState, useEffect} from "react";
import {BrowserRouter, Switch, Route, Link} from "react-router-dom";

import "./all.css";

let Delivery_app = (props) => {
	let get_order_id = () => {
		//TODO actually get the id from the url path
		return "test_order_id";
	};

	return (
		<div>
			<p className="p">{props.name}</p>
			<p className="p">Total: {props.price}</p>
			<p className="p">Estimated time to deliver: {props.time}</p>
			<a className="go" href={`/processing/${get_order_id()}`}>ORDER</a>
		</div>
	);
};

export default Delivery_app;
