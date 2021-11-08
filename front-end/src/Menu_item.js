import {useState, useEffect} from "react";
import {BrowserRouter, Switch, Route, Link} from "react-router-dom";

let Menu_item = (props) => {
	return (
		<div>
			<img src={`${process.env.REACT_APP_api_base_url}/static/food.jpg`} alt="Random food screen" />
			<p className="p">{props.name}</p>
			<p className="p">Description: {props.description}</p>
			<p className="p">Price: {props.price}</p>
		</div>
	);
};

export default Menu_item;
