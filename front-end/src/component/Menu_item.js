import config from "../config";

let Menu_item = (props) => {
	let click_handler = async (ev) => {
		let ele = ev.currentTarget;
		if (ele.classList.contains("proxy-item")){
			//toggle proxy-select checkbox
			ele.parentNode.children[0].click();
			ev.stopPropagation();
		}
	};

	return (
		<div>
			<input className="proxy-select" type="checkbox" />
			<div className="boxify proxy-item" onClick={click_handler}>
				<div className="menu-item-card">
					<div>
						<p className="p">{props.name}</p>
						<p className="p">{props.price}</p>
						<p className="p">{props.description}</p>
					</div>
					<div className="flex-divider" />
					<img src={`${config.backend_base_url}/static/food.jpg`} alt="Random food screen" />
				</div>
			</div>
		</div>
	);
};

export default Menu_item;
