import {useState, useEffect} from "react";
import {BrowserRouter, Switch, Route, Link} from "react-router-dom";

import "../all.css";

let Header = (props) => {
	return (
		<div className="relative-pos">
			<a className="slide-left" href="/">Home logo</a>
			<a className="slide-right" href="/previous-orders">Previous orders logo</a>
			{//to prevent content overlap due to absolute positioning
			}
			<div className="absolute-pos-bar"></div>
		</div>
	);
};

export default Header;
