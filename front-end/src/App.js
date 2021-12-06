import {BrowserRouter, Switch, Route} from "react-router-dom";

import DeliveryAppScreen from "./screen/DeliveryAppList";
//import Header from "./component/Header";
import MenuItemListScreen from "./screen/MenuItemList";
import OrderConfirmationScreen from "./screen/OrderConfirmation";
import RestaurantListScreen from "./screen/RestaurantList";
import login from "./screen/signIn";
import signup from "./screen/signUp";
import SigninButton from "./component/signin_button";
import SignupButton from "./component/signup_button";
import Sidebar from "./component/Sidebar";
import UserProfile from "./screen/UserProfile";

import "./all.css";

let App = (props) => {
	return (
		<div>
			{/*<Header />*/}
			<BrowserRouter>
				<Sidebar />
				<Switch>
					{
					<Route path="/signup" component={signup} />
					}
					
					{//list of menu items from restaurant chosen
					}
					{				
					<Route path="/login" component={login} />
					}
					<Route path="/restaurant/:order_id" component={MenuItemListScreen} />

					{//list of delivery apps that can serve the order
					}
					<Route path="/delivery/:order_id" component={DeliveryAppScreen} />

					{//waiting for external delivery app to confirm the order
					}
					<Route path="/processing/:order_id" component={OrderConfirmationScreen} />
					{//User profile that you can view name, username, and profile picture.
					}
					<Route path="/user-profile" component={UserProfile} />

					{//list of restaurants close to user
					}
					<Route path="/">
						<SigninButton />
						<SignupButton />
						<RestaurantListScreen />

					</Route>
				</Switch>
			</BrowserRouter>
		</div>
	);
}

export default App;
