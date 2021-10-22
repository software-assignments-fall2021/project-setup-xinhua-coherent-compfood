import {useState, useEffect} from "react";
import {BrowserRouter, Switch, Route, Link} from "react-router-dom";

import Restaurant from "./Restaurant";

let Home_screen = (props) => {
	let restaurants = [];
	for (let i = 0; i < 20; ++i){
		restaurants.push(<Restaurant name={`Restaurant #${i}`} />);
	}

	return (
		<div>
		<p>Home screen</p>
		{restaurants}
		</div>
	);
};

export default Home_screen;
