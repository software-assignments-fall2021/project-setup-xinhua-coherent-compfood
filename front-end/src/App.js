import {useState, useEffect} from "react";
import {BrowserRouter, Switch, Route, Link} from "react-router-dom";

import App_selector_screen from "./screen/App_selector_screen";
import Header from "./component/Header";
import Home_screen from "./screen/Home_screen";
import Order_screen from "./screen/Order_screen";
import Restaurant_screen from "./screen/Restaurant_screen";

import "./all.css";

let App = (props) => {
	return (
		<div>
			<Header />

			<BrowserRouter>
				<Switch>
					{//restaurant screen
					}
					<Route path="/restaurant/:order_id" component={Restaurant_screen} />

					{//app selector screen
					}
					<Route path="/delivery/:order_id" component={App_selector_screen} />

					{//processing order screen
					}
					<Route path="/processing/:order_id" component={Order_screen} />

					{//home screen
					}
					<Route path="/">
						<Home_screen />
					</Route>
				</Switch>
			</BrowserRouter>
		</div>
	);
}

export default App;
