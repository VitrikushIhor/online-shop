import {CartPage} from "../app/screens/CartPage";
import Meta from "../app/components/meta";
import {Footer} from "../app/components/footer";


const Cart = () => {
	return (
		 <Meta
				title="Order"
				description="Cart Page"
		 >
			 <CartPage/>
			 <Footer/>
		 </Meta>
	);
};

export default Cart;
