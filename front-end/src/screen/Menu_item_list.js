import axios from "axios";
import {useState, useEffect} from "react";

import config from "../config";
import MenuItem from "../component/Menu_item";

let Menu_item_list = (props) => {
	//MAGIC 12-46 items per restaurant

	let [menu_items, set_menu_items] = useState([]);

	useEffect(
		() => {
			axios(`${config.backend_base_url}/foods?rows=` + 12 + Math.floor(Math.random() * 35))
				.then((resp) => {
					let data = resp.data;
					let temp = [];

					for (let it of data){
						console.log(it);
						temp.push(<MenuItem name={it.name} description={it.description} price={it.price} />);
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

export default Menu_item_list;
