import {getSession} from "next-auth/react";
import Meta from "../../app/components/meta";
import {Footer} from "../../app/components/footer";
import {Header} from "../../app/components/header";
import {OrdersPage} from "../../app/screens/ProfilePages/OrdersPage";
import Order from "../../app/backendTools/models/Order"

const Orders = ({user, tab, orders}) => {
	debugger
	return (

		 <Meta
				title="Orders"
				description="Orders Page"
		 >
			 <Header/>
			 <OrdersPage user={user} tab={tab} orders={orders}/>
			 <Footer/>
		 </Meta>
	);
};

export default Orders

export async function getServerSideProps(context) {
	const {req, query} = context;
	const session = await getSession({req});

	if (!session) {
		return {
			redirect: {
				permanent: false,
				destination: "/signin",
			},
			props: {},
		};
	}

	const tab = query.tab || 0;

	const filter = query.q.split("__")[1];
	let orders = [];
	if (!filter) {
		orders = await Order.find({user: session?.user.id})
			 .sort({
				 createdAt: -1,
			 })
			 .lean();
	} else if (filter == "paid") {
		orders = await Order.find({user: session?.user.id, isPaid: true})
			 .sort({
				 createdAt: -1,
			 })
			 .lean();
	} else if (filter == "unpaid") {
		orders = await Order.find({user: session?.user.id, isPaid: false})
			 .sort({
				 createdAt: -1,
			 })
			 .lean();
	} else {
		orders = await Order.find({user: session?.user.id, status: filter})
			 .sort({
				 createdAt: -1,
			 })
			 .lean();
	}
	return {
		props: {user: session, tab, orders: JSON.parse(JSON.stringify(orders))},
	};
}
