import {useState, useEffect} from "react";
import {BrowserRouter, Switch, Route, Link} from "react-router-dom";

let Restaurant = (props) => {
	let generate_order_id = () => {
		//TODO actually generate a unique id each time and sync with backend
		return "test_order_id";
	};

	return (
		<div>
			<img src="https://picsum.photos/200/100" alt = "Lorem Picsum" />
			<p className="p">{props.name}</p>
			<p className="p">Description: {props.description}</p>
			<p className="p">Hours: {props.hours}</p>
			<p className="p">Address: {props.location}</p>
			<a className="go" href={`/restaurant/${generate_order_id()}`}>GO</a>
		</div>
	);
};

export default Restaurant;
