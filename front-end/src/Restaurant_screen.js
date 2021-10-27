import {useState, useEffect} from "react";
import {BrowserRouter, Switch, Route, Link} from "react-router-dom";

import Menu_item from "./Menu_item";


let Restaurant_screen = (props) => {
	let menu_items = [];
	for (let i = 0; i < 50; ++i){
		menu_items.push(<Menu_item name={`Menu item #${i}`} />);
	}

	let get_order_id = () => {
		//TODO actually get the id from the url path
		return "test_order_id";
	};

	return (
		<div>
		<p>Restaurant screen</p>
		{menu_items}
		<a className="go"href={`/delivery/${get_order_id()}`}>FIND APP</a>
		</div>
	);
};

export default Restaurant_screen;
