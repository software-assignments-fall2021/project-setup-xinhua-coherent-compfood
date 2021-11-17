import {useState, useEffect} from "react";
import {BrowserRouter, Switch, Route, Link} from "react-router-dom";

import "../all.css";

let Header = (props) => {
	return (
		<div className="relative-pos header">
			<a className="slide-left" href="/"><img src="/Home_logo.png" alt="Home logo" width="40" height="50"/></a>
			<a className="slide-right" href="/previous-orders"><img src="/Previous_orders.png" alt="Previous orders logo" width="40" height="50" /></a>
			{//to prevent content overlap due to absolute positioning
			}
			<div className="absolute-pos-bar"></div>
		</div>
	);
};

export default Header;
