import {useState, useEffect} from "react";
import {BrowserRouter, Switch, Route, Link} from "react-router-dom";

let Menu_item = (props) => {
	return (
		<div>
			<img src="https://picsum.photos/200/100" alt="Lorem Picsum">
			<p>{props.name}</p>
			<p>Description: {props.description}</p>
			<p>Price: {props.price}</p>
		</div>
	);
};

export default Menu_item;
