import "../all.css";

let Delivery_app = (props) => {
	let get_order_id = () => {
		let match = document.location.href.match(/\/([0-9a-f]{24})$/);

		return match === null ? "" : match[1];
	};

	return (
		<div className="boxify">
			<div className="delivery-app-card">
				<div>
					<p className="p">{props.name}</p>
					<a className="go" href={`/processing/${get_order_id()}`}>ORDER</a>
					<p className="p">Subtotal: {props.price}</p>
					<p className="p">Arriving in: {props.time}</p>
				</div>
				<div className="flex-divider" />
			</div>
		</div>
	);
};

export default Delivery_app;
