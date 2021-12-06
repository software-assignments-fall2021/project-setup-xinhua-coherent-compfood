import orderPic from'../orderConfirm.jpg';
import '../all.css';

let Order_confirmation = (props) => {
	return (
		<div>
			<div className = 'prompt'>Your Order Has Been Placed!</div>
			<div className="container">
          	<img src={orderPic} style={{ alignSelf: 'center' }}alt="cooking in progress"/>
        	</div>
			<div className = 'prompt'>Please Give us few Moments!</div>
		</div>
	);
};

export default Order_confirmation;
