import axios from "axios";
import {useState, useEffect} from "react";
import {BrowserRouter, Switch, Route, Link} from "react-router-dom";

import config from "../config";
import Restaurant from "../component/Restaurant";

let Restaurant_list = (props) => {
	//MAGIC 10-12 restaurants
	let num_restaurants = 10 + Math.floor(Math.random() * 3);

	let [restaurants, set_restaurants] = useState([]);

	useEffect(
		() => {
			axios(`${config.backend_base_url}/restaurants?rows=${num_restaurants}`)
				.then((resp) => {
					let data = resp.data;
					let temp = [];

					for (let it of data){
						console.log(it);
						temp.push(<Restaurant name={it.name} description={it.description} hours={`${it.hour_start} - ${it.hour_end}`} location={it.location} />);
					}
					set_restaurants(temp);
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
			<h2>Restaurants near you</h2>
			{restaurants}
		</div>
	);
};

export default Restaurant_list;
