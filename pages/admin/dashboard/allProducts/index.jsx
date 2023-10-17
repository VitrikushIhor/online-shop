import Meta from "../../../../app/components/meta";
import {AdminLayout} from "../../../../app/components/admin/adminLayout";
import {AllProductsPage} from "../../../../app/screens/Admin/AllProductsPage";
import {ProductsService} from "../../../../app/services/products/products-service";
import {getSession} from "next-auth/react";

const AllProducts = ({products}) => {
	return (
		 <Meta
				title="All Products Page"
		 >
			 <AdminLayout>
				 <AllProductsPage products={products}/>
			 </AdminLayout>
		 </Meta>
	);
};

export default AllProducts;

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

	const {data} = await ProductsService.getAllAdmin();
	return {
		props: {
			products: data,
		}
	}
}
