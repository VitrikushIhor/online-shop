import Meta from "../../../../app/components/meta";
import {AdminLayout} from "../../../../app/components/admin/adminLayout";
import {OrdersPage} from "../../../../app/screens/Admin/OrdersPage";
import {OrderService} from "../../../../app/services/order/order-service";
import {getSession} from "next-auth/react";

const Orders = ({orders}) => {
	debugger
	return (
		 <Meta
				title="Orders Page"
		 >
			 <AdminLayout>
				 <OrdersPage rows={orders}/>
			 </AdminLayout>
		 </Meta>
	);
};

export default Orders;


export async function getServerSideProps(Context) {

	const session = await getSession(Context);

	if (!session || (session && session.user.role !== "admin")) {
		return {
			redirect: {
				permanent: false,
				destination: "/",
			},
			props: {},
		};
	}
	
	const data = await OrderService.getAllOrders();
	return {
		props: {
			orders: data,
		},
	};
}
