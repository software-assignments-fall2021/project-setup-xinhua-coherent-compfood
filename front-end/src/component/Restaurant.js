import config from "../config";

let Restaurant = (props) => {
	let generate_order_id = () => {
		//TODO actually generate a unique id each time and sync with backend
		return "test_order_id";
	};

	return (
		<div className="boxify">
			<div className="restaurant-card">
				<div>
					<p className="p">{props.name}</p>
					<a className="go" href={`/restaurant/${generate_order_id()}`}>GO</a>
					<p className="p">{props.description}</p>
					<p className="p">Open: {props.hours}</p>
					<p className="p">Location: {props.location}</p>
				</div>
				<div className="flex-divider" />
				<img src={`${config.backend_base_url}/static/restaurant.jpg`} alt="Random restaurant screen" />
			</div>
		</div>
	);
};

export default Restaurant;
