import {Header} from "./header";
import styles from "./styles.module.scss";
import {CartEmpty} from "./cartEmpty";
import {useDispatch, useSelector} from "react-redux";
import {CartProduct} from "./cartProduct";
import {CartHeader} from "./cartHeader";
import {useEffect, useState} from "react";
import {CheckOut} from "./checkout";
import {PaymentMethod} from "./paymentMethod";
import {signIn, useSession} from "next-auth/react";
import {useRouter} from "next/router";
import {userService} from "../../services/user/user-service";
import {updateCart} from "../../store/cartSlice";

export const CartPage = ({user}) => {
	const {data: session} = useSession()
	const {push} = useRouter();
	const {cart} = useSelector((state) => ({...state}));
	const [selected, setSelected] = useState([]);
	const [shippingFee, setShippingFee] = useState(0);
	const [subtotal, setSubtotal] = useState(0);
	const [total, setTotal] = useState(0);
	const dispatch = useDispatch()

	const saveToCartHandler = async () => {
		if (session) {
			const res = await userService.saveCart({cart: selected})
			await push("/checkout")
		} else {
			await signIn()
		}
	}

	useEffect(() => {
		setShippingFee(selected.reduce((acc, item) => acc + Number(item.shipping), 0).toFixed(2));
		setSubtotal(selected.reduce((acc, item) => acc + item.price * item.qty, 0).toFixed(2));
		setTotal((selected.reduce((acc, item) => acc + item.price * item.qty, 0) + Number(shippingFee)).toFixed(2)
		);
	}, [selected]);


	useEffect(() => {
		const update = async () => {
			const data = await userService.updateCart({products: cart.cartItems})
			dispatch(updateCart(data))
		}
		if (cart.cartItems.length > 0) {
			update()
		}
	}, [])

	return (
		 <div>
			 <Header/>
			 <div className={styles.cart}>
				 {cart?.cartItems?.length > 0 ?
						<div className={styles.cart__container}>
							<CartHeader cartItems={cart.cartItems} selected={selected} setSelected={setSelected}/>
							<div class={styles.cart__products}>
								{
									cart.cartItems.map((product) => (
										 <CartProduct
												user={user}
												selected={selected}
												setSelected={setSelected}
												product={product}
												key={product._uid}/>
									))
								}
							</div>
							<CheckOut
								 selected={selected}
								 saveCartToDbHandler={saveToCartHandler}
								 total={total}
								 shippingFee={shippingFee}
								 subtotal={subtotal}
							/>
							<PaymentMethod/>
						</div>
						:
						<CartEmpty/>}

			 </div>
		 </div>
	);
};

