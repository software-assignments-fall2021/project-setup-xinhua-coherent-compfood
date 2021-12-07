import "../all.css";

let mode = 'light';

function clickMe(){
	if(mode === 'light'){
		mode = 'dark';
	}
	else{
		mode = 'light';
	}
	
	console.log(mode);
}
let Header = (props) => {
	return (
		<div className="relative-pos header">
			{//to prevent content overlap due to absolute positioning
			}
			<button onClick={clickMe} type="button" className="button">Dark/Light Mode</button>
			<div className="absolute-pos-bar"></div>
		</div>
	);
};

export default Header;
