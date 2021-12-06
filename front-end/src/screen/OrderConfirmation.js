import orderPic from'../orderConfirm.jpg';
let Order_confirmation = (props) => {
	return (
		<div>
			<p style={{
				fontSize: 40,
				position: 'relative',
				left: 125
			}}>Your Order Has Been Placed!</p>
			<div className="container">
          	<img src={orderPic} style={{ alignSelf: 'center' }}/>
        	</div>
			<p style={{
				fontSize: 40,
				position: 'relative',
				left: 125
			}}>Please Give us few Moments!
			</p>
		</div>
	);
};

export default Order_confirmation;
