import axios from "axios";
import {useState, useEffect} from "react";
import {BrowserRouter, Switch, Route, Link} from "react-router-dom";

import config from "../config";
import Delivery_app from "../component/Delivery_app";

let Delivery_app_list = (props) => {
	//MAGIC 5 delivery apps
	let num_delivery_apps = 5;

	let [delivery_apps, set_delivery_apps] = useState([]);

	useEffect(
		() => {
			axios(`${config.backend_base_url}/apps?rows=${num_delivery_apps}`)
				.then((resp) => {
					let data = resp.data;
					let temp = [];

					for (let it of data){
						console.log(it);
						temp.push(<Delivery_app name={it.name} price={it.price} time={it.time} />);
					}
					set_delivery_apps(temp);
				})
				.catch((ex) => {
					alert(`Something went wrong!: ${ex}`);
				})
			;
		},
		[]
	);

	return (
		<div>
		<h2>Apps available</h2>
		{delivery_apps}
		</div>
	);
};

export default Delivery_app_list;
