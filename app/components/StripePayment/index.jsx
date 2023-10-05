import {Elements} from "@stripe/react-stripe-js";
import {loadStripe} from "@stripe/stripe-js";
import {FormStripe} from "./formStripe";


export const StripePayment = ({stripeKey, total, orderId}) => {
	const stripePromise = loadStripe(stripeKey);

	return (
		 <Elements stripe={stripePromise}>
			 <FormStripe total={total} orderId={orderId}/>
		 </Elements>
	);
};

