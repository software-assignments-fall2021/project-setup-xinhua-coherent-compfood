import axios from "axios";
import {useState, useEffect} from "react";
import {BrowserRouter, Switch, Route, Link} from "react-router-dom";

import Delivery_app from "./Delivery_app";

let App_selector_screen = (props) => {
	//MAGIC 5 delivery apps
	let num_delivery_apps = 5;

	let [delivery_apps, set_delivery_apps] = useState([]);

	useEffect(
		() => {
			axios(`https://dl.dsosd.org/swe474/apps?key=0d22b2f0&rows=${num_delivery_apps}`)
			//axios(`https://my.api.mockaroo.com/apps?key=0d22b2f0&rows=${num_delivery_apps}`)
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
		<p>App selector screen</p>
		{delivery_apps}
		</div>
	);
};

export default App_selector_screen;
