import {useState, useEffect} from "react";
import {BrowserRouter, Switch, Route, Link} from "react-router-dom";

import Delivery_app from "./Delivery_app";

let App_selector_screen = (props) => {
	let delivery_apps = [];
	for (let i = 0; i < 5; ++i){
		delivery_apps.push(<Delivery_app name={`Delivery app #${i}`} />);
	}

	return (
		<div>
		<p>App selector screen</p>
		{delivery_apps}
		</div>
	);
};

export default App_selector_screen;
