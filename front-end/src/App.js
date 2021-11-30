import {BrowserRouter, Switch, Route} from "react-router-dom";

import DeliveryAppScreen from "./screen/DeliveryAppList";
import Header from "./component/Header";
import MenuItemListScreen from "./screen/MenuItemList";
import OrderConfirmationScreen from "./screen/OrderConfirmation";
import RestaurantListScreen from "./screen/RestaurantList";
import signup from "./screen/signIn";
import login from "./screen/signUp";

import "./all.css";

let App = (props) => {
	return (
		<div>
			<Header />

			<BrowserRouter>
				<Switch>
					{
					<Route path="/SignIn" component={signup} />
					}
					
					{//list of menu items from restaurant chosen
					}
					{				
					<Route path="/Login" component={login} />
					}
					<Route path="/restaurant/:order_id" component={MenuItemListScreen} />

					{//list of delivery apps that can serve the order
					}
					<Route path="/delivery/:order_id" component={DeliveryAppScreen} />

					{//waiting for external delivery app to confirm the order
					}
					<Route path="/processing/:order_id" component={OrderConfirmationScreen} />

					{//list of restaurants close to user
					}
					<Route path="/">
						<RestaurantListScreen />
					</Route>
				</Switch>
			</BrowserRouter>
		</div>
	);
}

export default App;
