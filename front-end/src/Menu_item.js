import {useState, useEffect} from "react";
import {BrowserRouter, Switch, Route, Link} from "react-router-dom";
import "./Menu_item.css";

let Menu_item = (props) => {
	return (
		<div>
			<p className="p">{props.name}</p>
			<p className="p">Description TODO</p>
			<p className="p">Price: TODO</p>
		</div>
	);
};

export default Menu_item;
