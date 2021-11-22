import {useState, useEffect} from "react";
import {BrowserRouter, Switch, Route, Link} from "react-router-dom";

<<<<<<< HEAD
import App_selector_screen from "./App_selector_screen";
import Header from "./Header";
import Home_screen from "./Home_screen";
import Order_screen from "./Order_screen";
import Restaurant_screen from "./Restaurant_screen";
import SignUp from "./signUp";
import SignIn from "./signIn";
=======
import Delivery_app_screen from "./screen/Delivery_app_list";
import Header from "./component/Header";
import Menu_item_list_screen from "./screen/Menu_item_list";
import Order_confirmation_screen from "./screen/Order_confirmation";
import Restaurant_list_screen from "./screen/Restaurant_list";
>>>>>>> origin

import "./all.css";

let App = (props) => {
	return (
		<div>
			<Header />

			<BrowserRouter>
				<Switch>
<<<<<<< HEAD
					{//sign up screen

					}
					
					<Route path="/signUp" component={SignUp} />

					{//sign in screen
					}
					
					<Route path="/signIn" component={SignIn} />	

					{//restaurant screen
=======
					{//list of menu items from restaurant chosen
>>>>>>> origin
					}
					<Route path="/restaurant/:order_id" component={Menu_item_list_screen} />

					{//list of delivery apps that can serve the order
					}
					<Route path="/delivery/:order_id" component={Delivery_app_screen} />

					{//waiting for external delivery app to confirm the order
					}
					<Route path="/processing/:order_id" component={Order_confirmation_screen} />

					{//list of restaurants close to user
					}
					<Route path="/">
						<Restaurant_list_screen />
					</Route>
				</Switch>
			</BrowserRouter>
		</div>
	);
}

export default App;
