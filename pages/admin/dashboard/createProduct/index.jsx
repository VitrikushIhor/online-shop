import Meta from "../../../../app/components/meta";
import {AdminLayout} from "../../../../app/components/admin/adminLayout";
import {ProductsService} from "../../../../app/services/products/products-service";
import {CreateProductPage} from "../../../../app/screens/Admin/CreateProductPage";
import {getSession} from "next-auth/react";

const CreateProduct = ({data}) => {
	return (
		 <Meta
				title="Create Product Page"
		 >
			 <AdminLayout>
				 <CreateProductPage categories={data.categories} parents={data.parents}/>
			 </AdminLayout>
		 </Meta>
	);
};

export default CreateProduct;

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

	const {data} = await ProductsService.getAdminCategories();
	return {
		props: {
			data,
		}
	}
}
