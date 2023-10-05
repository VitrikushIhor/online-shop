import styles from "./styles.module.scss";
import {IoIosArrowForward} from "react-icons/io";
import {PayPalButtons, usePayPalScriptReducer} from "@paypal/react-paypal-js";
import {useEffect, useReducer} from "react";
import {PulseLoader} from "react-spinners";
import {StripePayment} from "../../components/StripePayment";
import {toast} from "react-toastify";
import {OrderService} from "../../services/order/order-service";

const ActionTypes = {
	PAY_REQUEST: "PAY_REQUEST",
	PAY_SUCCESS: "PAY_SUCCESS",
	PAY_FAIL: "PAY_FAIL",
	PAY_RESET: "PAY_RESET",
};


function reducer(state, action) {
	switch (action.type) {
		case ActionTypes.PAY_REQUEST:
			return {...state, loading: true, success: false, error: null};
		case ActionTypes.PAY_SUCCESS:
			return {...state, loading: false, success: true, error: null};
		case ActionTypes.PAY_FAIL:
			return {...state, loading: false, success: false, error: action.payload};
		case ActionTypes.PAY_RESET:
			return {...state, loading: false, success: false, error: false};
		default:
			return state;
	}
}


export const OrderPage = ({order, paypalClientId, stripeKey}) => {
	const statusClassMap = {
		"Not Processed": styles.not_processed,
		"Processing": styles.processing,
		"Dispatched": styles.dispatched,
		"Cancelled": styles.cancelled,
		"Completed": styles.completed,
	};
	const statusClass = statusClassMap[order.status] || "";

	const [{isPending}, paypalDispatch] = usePayPalScriptReducer();
	const [state, customDispatch] = useReducer(reducer, {
		loading: true,
		error: "",
		success: "",
	});

	useEffect(() => {
		if (!order._id) {
			customDispatch({
				type: "PAY_RESET",
			});
		} else {
			paypalDispatch({
				type: "resetOptions",
				value: {
					"client-id": paypalClientId,
					currency: "USD",
				},
			});
			paypalDispatch({
				type: "setLoadingStatus",
				value: "pending",
			});
		}
	}, []);

	function createOrderHanlder(data, actions) {
		return actions.order
			 .create({
				 purchase_units: [
					 {
						 amount: {
							 value: order.total,
						 },
					 },
				 ],
			 })
			 .then((order_id) => {
				 return order_id;
			 });
	}

	function onApproveHandler(data, actions) {
		return actions.order.capture().then(async function (details) {
			try {
				customDispatch({type: "PAY_REQUEST"});
				const data = await OrderService.payWithPayPal({details: details, orderId: order._id});
				customDispatch({type: "PAY_SUCCESS", payload: data});
				toast.success("Payment Successfull")
				window.location.reload(false);

			} catch (error) {
				customDispatch({type: "PAY_ERROR", payload: error});
			}
		});
	}

	function onErroHandler(error) {
		console.log(error);
	}


	return (
		 <div className={styles.order}>
			 <div className={styles.container}>
				 <div className={styles.order__infos}>
					 <div className={styles.order__header}>
						 <div className={styles.order__header_head}>
							 Home <IoIosArrowForward/> Orders <IoIosArrowForward/> ID{" "}
							 {order._id}
						 </div>
						 <div className={styles.order__header_status}>
							 Payment Status :{" "}
							 {order.isPaid ? (
									<img src="../../../images/verified.png" alt="paid"/>
							 ) : (
									<img src="../../../images/unverified.png" alt="paid"/>
							 )}
						 </div>
						 <div className={styles.order__header_status}>
							 Order Status :
							 <span className={statusClass}>
                  {order.status}
                </span>
						 </div>
					 </div>
					 <div className={styles.order__products}>
						 {order.products.map(product => (
								<div className={styles.product} key={product._id}>
									<div class={styles.product__img}>
										<img src={product.image} alt="product_img"/>
									</div>
									<div className={styles.product__infos}>
										<h1 className={styles.product__infos_name}>
											{product.name.length > 30
												 ? `${product.name.substring(0, 30)}...`
												 : product.name}
										</h1>
										<div className={styles.product__infos_style}>
											<img src={product.color.image} alt=""/> / {product.size}
										</div>
										<div className={styles.product__infos_priceQty}>
											{product.price}$ x {product.qty}
										</div>
										<div className={styles.product__infos_total}>
											{product.price * product.qty}$
										</div>
									</div>
								</div>
						 ))}
						 <div className={styles.order__products_total}>
							 {order.couponApplied ? (
									<>
										<div className={styles.order__products_total_sub}>
											<span>Subtotal</span>
											<span>{order.totalBeforeDiscount}$</span>
										</div>
										<div className={styles.order__products_total_sub}>
                      <span>
                        Coupon Applied <em>({order.couponApplied})</em>{" "}
                      </span>
											<span>
                        -
												{(
													 order.totalBeforeDiscount - order.total
												).toFixed(2)}
												$
                      </span>
										</div>
										<div className={styles.order__products_total_sub}>
											<span>Tax price</span>
											<span>+{order.taxPrice}$</span>
										</div>
										<div
											 className={`${styles.order__products_total_sub} ${styles.bordertop}`}
										>
											<span>TOTAL TO PAY</span>
											<b>{order.total}$</b>
										</div>
									</>
							 ) : (
									<>
										<div className={styles.order__products_total_sub}>
											<span>Tax price</span>
											<span>+{order.taxPrice}$</span>
										</div>
										<div
											 className={`${styles.order__products_total_sub} ${styles.bordertop}`}
										>
											<span>TOTAL TO PAY</span>
											<b>{order.total}$</b>
										</div>
									</>
							 )}
						 </div>
					 </div>
				 </div>
				 <div className={styles.order__actions}>
					 <div className={styles.order__address}>
						 <h1>Customers Order</h1>
						 <div class={styles.order__address_user}>
							 <div className={styles.order__address_user_infos}>
								 <img src={order.user.image} alt=""/>
								 <div>
									 <span>{order.user.name}</span>
									 <span>{order.user.email}</span>
								 </div>
							 </div>
						 </div>
						 <div class={styles.order__address_shipping}>
							 <h2>Shipping Address</h2>
							 <span>{order.shippingAddress.firstName} {" "}
								 {order.shippingAddress.lastName}
							 </span>
							 <span>{order.shippingAddress.address1}</span>
							 <span>{order.shippingAddress.address2}</span>
							 <span>{order.shippingAddress.state},{order.shippingAddress.city}</span>
							 <span>{order.shippingAddress.zipCode}</span>
							 <span>{order.shippingAddress.country}</span>
						 </div>
						 <div className={styles.order__address_shipping}>
							 <h2>Billing Address</h2>
							 <span>{order.shippingAddress.firstName} {" "}
								 {order.shippingAddress.lastName}
							 </span>
							 <span>{order.shippingAddress.address1}</span>
							 <span>{order.shippingAddress.address2}</span>
							 <span>{order.shippingAddress.state},{order.shippingAddress.city}</span>
							 <span>{order.shippingAddress.zipCode}</span>
							 <span>{order.shippingAddress.country}</span>
						 </div>
					 </div>
					 {!order.isPaid && <div className={styles.order__payment}>
						 {order.paymentMethod === "paypal" &&
								<div>
									{isPending ? <PulseLoader color="#2f82ff"/> :
										 <PayPalButtons
												createOrder={createOrderHanlder}
												onApprove={onApproveHandler}
												onError={onErroHandler}
										 >

										 </PayPalButtons>}
								</div>}
						 {order.paymentMethod === "credit_card" &&
								<StripePayment
									 total={order.total}
									 orderId={order._id}
									 stripeKey={stripeKey}
								/>}
						 {order.paymentMethod === "cash" && (
								<div className={styles.cash}>Cash</div>
						 )}
					 </div>}
				 </div>
			 </div>
		 </div>
	);
};

