import {CategoriesPage} from "../../../../app/screens/Admin/CategoriesPage";
import Meta from "../../../../app/components/meta";
import {AdminLayout} from "../../../../app/components/admin/adminLayout";
import {CategoriesService} from "../../../../app/services/categories/categories-service";
import {getSession} from "next-auth/react";

const Categories = ({categories}) => {
	return (
		 <Meta
				title="Categories Page"
		 >
			 <AdminLayout>
				 <CategoriesPage categories={categories}/>
			 </AdminLayout>
		 </Meta>
	);
};

export default Categories;


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

	const {data} = await CategoriesService.getAll();
	return {
		props: {
			categories: data,
		}
	}
}
