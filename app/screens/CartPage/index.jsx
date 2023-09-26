import {CartHeader} from "./cartHeader";
import styles from "./styles.module.scss";
import {CartEmpty} from "./cartEmpty";

export const CartPage = () => {
	const cart = []
	return (
		 <div>
<CartHeader/>
			 <div className={styles.cart}>
				 {cart.length > 1 ?
					  <div className={styles.cart__container}></div>
					  :
					  <CartEmpty/>}
			 </div>
		 </div>
	);
};

