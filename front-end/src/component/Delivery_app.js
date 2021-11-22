import {useState, useEffect} from "react";
import {BrowserRouter, Switch, Route, Link} from "react-router-dom";

import "../all.css";

let Delivery_app = (props) => {
	let get_order_id = () => {
		//TODO actually get the id from the url path
		return "test_order_id";
	};

	return (
		<div className="boxify">
			<div className="delivery-app-card">
				<div>
					<p className="p">{props.name}</p>
					<a className="go" href={`/processing/${get_order_id()}`}>ORDER</a>
					<p className="p">Subtotal: {props.price}</p>
					<p className="p">Arriving in: {props.time}</p>
				</div>
				<div className="flex-divider" />
			</div>
		</div>
	);
};

export default Delivery_app;
