import Meta from "../../../../app/components/meta";
import {AdminLayout} from "../../../../app/components/adminLayout";
import {AllProductsPage} from "../../../../app/screens/Admin/AllProductsPage";
import {ProductsService} from "../../../../app/services/products/products-service";

const AllProducts = ({products}) => {
	debugger
	return (
		 <Meta
				title="Categories Page"
		 >
			 <AdminLayout>
				 <AllProductsPage products={products}/>
			 </AdminLayout>
		 </Meta>
	);
};

export default AllProducts;

export async function getServerSideProps() {
	const {data} = await ProductsService.getAllAdmin();
	return {
		props: {
			products: data,
		}
	}
}
