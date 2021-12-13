import axios from "axios";

import config from "../config";

let Restaurant = (props) => {
	let generate_order_id = async () => {
		axios(`${config.backend_base_url}/new_order`, {method: "POST"})
			.then((resp) => {
				let data = resp.data;

				axios(`${config.backend_base_url}/set_order/${data.id}`, {
						method: "POST",
						data: {
							restaurant: props.id
						}
					})
					.then((resp) => {
						document.location.href = `/restaurant/${data.id}`;
					})
					.catch((ex) => {
						alert(`Something went wrong!: ${ex}`);
					})
				;
			})
			.catch((ex) => {
				alert(`Something went wrong!: ${ex}`);
			})
		;
	};

	return (
		<div className="boxify">
			<div className="restaurant-card">
				<div>
					<p className="p">{props.name}</p>
					<p className="go" onClick={generate_order_id}>GO</p>
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
