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
			<p>Description TODO</p>
			<p>Hours: TODO</p>
			<p>Distance: TODO</p>
			<a href={`/restaurant/${generate_order_id()}`}>GO</a>
		</div>
	);
};

export default Restaurant;
