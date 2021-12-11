import axios from "axios";
import {useState, useEffect} from "react";

import config from "../config";
import MenuItem from "../component/Menu_item";

let MenuItemList = (props) => {
	let [menu_items, set_menu_items] = useState([]);

	useEffect(
		() => {
			axios(`${config.backend_base_url}/foods/${get_order_id()}`)
				.then((resp) => {
					let data = resp.data;
					let temp = [];

					for (let it of data){
						console.log(it);
						temp.push(<MenuItem key={it.id} id={it.id} name={it.name} description={it.description} price={it.price} />);
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
		let match = document.location.href.match(/\/([0-9a-f]{24})$/);

		return match === null ? "" : match[1];
	};

	return (
		<div>
		<h2>Menu</h2>
		{menu_items}
		<a href={`/delivery/${get_order_id()}`}><button>FIND DELIVERY OPTIONS</button></a>
		</div>
	);
};

export default MenuItemList;
