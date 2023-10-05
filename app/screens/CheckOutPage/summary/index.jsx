import styles from "./styles.module.scss";
import {useState} from "react";
import {validateCoupon} from "../../../utils/validation";
import {Form, Formik} from "formik";
import {ShippingInput} from "../../../components/inputs/shippingInput";
import {toast} from "react-toastify";
import {userService} from "../../../services/user/user-service";
import {useRouter} from "next/router";
import {OrderService} from "../../../services/order/order-service";


export const Summary = ({
	                        user,
	                        cart,
	                        paymentMethod,
	                        selectedAddress,
	                        totalAfterDiscount,
	                        setTotalAfterDiscount
                        }) => {
	const [coupon, setCoupon] = useState("");
	const [discount, setDiscount] = useState()
	const router = useRouter();

	const applyCouponHandler = async () => {
		const res = await userService.applyCoupon({coupon});
		if (res.message) {
			toast.error(res.message)
		} else {
			setTotalAfterDiscount(res.totalAfterDiscount);
			setDiscount(res.discount);
		}
	};
	const placeOrderHandler = async () => {
		try {
			if (paymentMethod === "") {
				toast.error("Please choose a payment method.");
				return
			} else if (!selectedAddress) {
				toast.error("Please choose a shipping address.");
				return
			}
			const data = await OrderService.saveOrder({
				products: cart.products,
				shippingAddress: selectedAddress,
				paymentMethod,
				total: totalAfterDiscount !== "" ? totalAfterDiscount : cart.cartTotal,
				totalBeforeDiscount: cart.cartTotal,
				couponApplied: coupon,
			});
			await router.push(`/order/${data.order_id}`);
		} catch (e) {
			toast.error(e.response);
		}
	}
	return (
		 <div className={styles.summary}>
			 <div className={styles.header}>
				 <h3>Order Summary</h3>
			 </div>
			 <div className={styles.coupon}>
				 <Formik
						enableReinitialize
						initialValues={{coupon}}
						validationSchema={validateCoupon}
						onSubmit={() => {
							applyCouponHandler();
						}}
				 >
					 {(formik) => (
							<Form>
								<ShippingInput
									 name="coupon"
									 placeholder="*Coupon"
									 onChange={(e) => setCoupon(e.target.value)}
								/>
								<button className={styles.apply_btn} type="submit">
									Apply
								</button>
								<div className={styles.infos}>
                <span>
                  Total : <b>{cart.cartTotal}$</b>{" "}
                </span>
									{discount > 0 && (
										 <span className={styles.coupon_span}>
                    Coupon applied : <b> -{discount}%</b>
                  </span>
									)}
									{totalAfterDiscount < cart.cartTotal &&
										 totalAfterDiscount != "" && (
												<span>
                      New price : <b>{totalAfterDiscount}$</b>
                    </span>
										 )}
								</div>
							</Form>
					 )}
				 </Formik>
			 </div>
			 <button className={styles.submit_btn} onClick={() => placeOrderHandler()}>
				 Place Order
			 </button>
		 </div>
	);
};

