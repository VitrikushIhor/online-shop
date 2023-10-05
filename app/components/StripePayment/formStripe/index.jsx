import styles from "./styles.module.scss";
import {CardElement, useElements, useStripe} from "@stripe/react-stripe-js";
import {toast} from "react-toastify";
import {OrderService} from "../../../services/order/order-service";

const cardOptions = {
	iconStyle: "solid",
	style: {
		base: {
			fontSize: "16px",
			color: "#32325d",
			fontFamily: "-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Open Sans, Helvetica Neue, sans-serif",
			"::placeholder": {
				color: "#aab7c4",
			},
		},
		invalid: {
			color: "#fa755a",
			iconColor: "#fa755a",
		},
	},
}

export const FormStripe = ({orderId, total}) => {
	const stripe = useStripe()
	const elements = useElements()

	const handleSubmit = async (e) => {
		e.preventDefault();
		const {error, paymentMethod} = await stripe.createPaymentMethod({
			type: "card",
			card: elements.getElement(CardElement),
		});

		if (!error) {
			try {
				const {id} = paymentMethod
				const res = await OrderService.payWithStripe({orderId: orderId, amount: total, id: id})
				if (res.success) {
					toast.success("Payment successful")
					window.location.reload(false);
				}
			} catch (e) {
				toast.error(e)
			}
		} else {
			toast.error(error.message)
		}
	}
	return (
		 <div className={styles.stripe}>
			 <form onSubmit={handleSubmit}>
				 <CardElement options={cardOptions}/>
				 <button type={"submit"}>Pay</button>
			 </form>
		 </div>
	);
};

