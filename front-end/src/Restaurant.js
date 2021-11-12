import {useState, useEffect} from "react";
import {BrowserRouter, Switch, Route, Link} from "react-router-dom";

let Restaurant = (props) => {
	let generate_order_id = () => {
		//TODO actually generate a unique id each time and sync with backend
		return "test_order_id";
	};

	return (
		<div>
			<img src={`${process.env.REACT_APP_api_base_url}/static/restaurant.jpg`} alt="Random restaurant screen" />
			<p className="p">{props.name}</p>
			<p className="p">Description: {props.description}</p>
			<p className="p">Hours: {props.hours}</p>
			<p className="p">Address: {props.location}</p>
			<a className="go" href={`/restaurant/${generate_order_id()}`}>GO</a>
		</div>
	);
};

export default Restaurant;
