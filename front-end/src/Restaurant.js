import {useState, useEffect} from "react";
import {BrowserRouter, Switch, Route, Link} from "react-router-dom";
import "./Restaurant.css";

let Restaurant = (props) => {
	let generate_order_id = () => {
		//TODO actually generate a unique id each time and sync with backend
		return "test_order_id";
	};

	return (
		<div>
			<p className="p">{props.name}</p>
			<p className="p"> Description TODO</p>
			<p className="p">Hours: TODO</p>
			<p className="p">Distance: TODO</p>
			<a className="go" href={`/restaurant/${generate_order_id()}`}>GO</a>
		</div>
	);
};

export default Restaurant;
