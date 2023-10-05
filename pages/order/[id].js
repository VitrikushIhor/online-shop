import {OrderPage} from "../../app/screens/OrderPage";
import {Layout} from "../../app/components/layout";
import Meta from "../../app/components/meta";
import {OrderService} from "../../app/services/order/order-service";
import {getSession} from "next-auth/react";

const Order = ({order, paypalClientId, stripeKey}) => {
	return (
		 <Layout>
			 <Meta
					title="Order Page"
					description="Order Page"
			 >
				 <OrderPage order={order.order} paypalClientId={paypalClientId} stripeKey={stripeKey}/>
			 </Meta>
		 </Layout>
	);
};

export default Order;

export async function getServerSideProps(context) {

	const session = await getSession(context);
	if (!session) {
		return {
			redirect: {
				destination: "/signin",
				permanent: false,
			},
		};
	}

	const {query} = context;
	const id = query.id;
	const data = await OrderService.getById({id: id})
	let paypalClientId = process.env.PAYPAL_CLIENT_ID;
	let stripeKey = process.env.STRIPE_PUBLIC_KEY;

	return {
		props: {
			order: data,
			paypalClientId,
			stripeKey
		}
	}
}
