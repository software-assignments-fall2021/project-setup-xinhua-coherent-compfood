import {BrowserRouter, Switch, Route} from "react-router-dom";

import Delivery_app_screen from "./screen/Delivery_app_list";
import Header from "./component/Header";
import Menu_item_list_screen from "./screen/Menu_item_list";
import Order_confirmation_screen from "./screen/Order_confirmation";
import RestaurantListScreen from "./screen/Restaurant_list";

import "./all.css";

let App = (props) => {
	return (
		<div>
			<Header />

			<BrowserRouter>
				<Switch>
					{//list of menu items from restaurant chosen
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
						<RestaurantListScreen />
					</Route>
				</Switch>
			</BrowserRouter>
		</div>
	);
}

export default App;
