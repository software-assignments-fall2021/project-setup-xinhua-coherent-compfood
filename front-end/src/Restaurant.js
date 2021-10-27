import {useState, useEffect} from "react";
import {BrowserRouter, Switch, Route, Link} from "react-router-dom";

let Restaurant = (props) => {
	let generate_order_id = () => {
		//TODO actually generate a unique id each time and sync with backend
		return "test_order_id";
	};

	return (
		<div>
			<p>{props.name}</p>
			<p>Description: {props.description}</p>
			<p>Hours: {props.hours}</p>
			<p>Address: {props.location}</p>
			<a href={`/restaurant/${generate_order_id()}`}>GO</a>
		</div>
	);
};

export default Restaurant;
