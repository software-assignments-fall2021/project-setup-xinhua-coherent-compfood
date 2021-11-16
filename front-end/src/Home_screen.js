import axios from "axios";
import {useState, useEffect} from "react";
import {BrowserRouter, Switch, Route, Link} from "react-router-dom";
import styled from 'styled-components'
import config from "./config";
import Restaurant from "./Restaurant";

const Button = styled.button`
	background-color: black;
	color: white;
	padding: 5px 15px;
	border-radius: 5px;
	outline: 0;
	box-shadow: 0px 2px 2px lightgrey;
`
function clickMe(){
	alert('light/dark mode toggled');
}


let Home_screen = (props) => {
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
			<div>
				<h2>Restaurants near you</h2>
				<div>
					<Button onClick={clickMe}>
						Light/Dark
					</Button>
				</div>
				{restaurants}
				</div>
		</div>
		
	);
};

export default Home_screen;
