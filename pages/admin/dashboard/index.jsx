import {DashboardPage} from "../../../app/screens/Admin/DashboardPage";
import {AdminLayout} from "../../../app/components/admin/adminLayout";
import Meta from "../../../app/components/meta";
import {ProductsService} from "../../../app/services/products/products-service";
import {OrderService} from "../../../app/services/order/order-service";
import {userService} from "../../../app/services/user/user-service";
import {getSession} from "next-auth/react";

const Dashboard = ({users, orders, products}) => {
	return (
		 <Meta
				title="Dashboard Page"
		 >
			 <AdminLayout>
				 <DashboardPage users={users} orders={orders} products={products}/>
			 </AdminLayout>
		 </Meta>

	);
};

export default Dashboard;

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


	const data = await userService.getAllUsers()
	const data1 = await OrderService.getAllOrders()
	const {data: products} = await ProductsService.getAll();
	return {
		props: {users: data, orders: data1, products: products}
	}
}
