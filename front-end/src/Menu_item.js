import {useState, useEffect} from "react";
import {BrowserRouter, Switch, Route, Link} from "react-router-dom";

import config from "./config";

let Menu_item = (props) => {
	return (
		<div>
			<img src={`${config.backend_base_url}/static/food.jpg`} alt="Random food screen" />
			<p className="p">{props.name}</p>
			<p className="p">Description: {props.description}</p>
			<p className="p">Price: {props.price}</p>
		</div>
	);
};

export default Menu_item;
