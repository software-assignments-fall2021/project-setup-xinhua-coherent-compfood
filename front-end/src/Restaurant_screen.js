import axios from "axios";
import {useState, useEffect} from "react";
import {BrowserRouter, Switch, Route, Link} from "react-router-dom";

import config from "./config";
import Menu_item from "./Menu_item";

let Restaurant_screen = (props) => {
	//MAGIC 12-46 items per restaurant
	let num_menu_items = 12 + Math.floor(Math.random() * 35);

	let [menu_items, set_menu_items] = useState([]);

	useEffect(
		() => {
			axios(`${config.backend_base_url}/foods?rows=${num_menu_items}`)
				.then((resp) => {
					let data = resp.data;
					let temp = [];

					for (let it of data){
						console.log(it);
						temp.push(<Menu_item name={it.name} description={it.description} price={it.price} />);
					}
					set_menu_items(temp);
				})
				.catch((ex) => {
					alert(`Something went wrong!: ${ex}`);
				})
			;
		},
		[]
	);

	let get_order_id = () => {
		//TODO actually get the id from the url path
		return "test_order_id";
	};

	return (
		<div>
		<h2>Menu</h2>
		{menu_items}
		<a href={`/delivery/${get_order_id()}`}>FIND APP</a>
		</div>
	);
};

export default Restaurant_screen;
