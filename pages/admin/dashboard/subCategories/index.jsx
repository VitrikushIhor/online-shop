import Meta from "../../../../app/components/meta";
import {AdminLayout} from "../../../../app/components/adminLayout";
import {SubCategoriesPage} from "../../../../app/screens/Admin/SubCategoriesPage";
import {CategoriesService} from "../../../../app/services/categories/categories-service";
import {SubCategoriesService} from "../../../../app/services/SubCategories/SubCategories-service";

const SubCategories = ({categories, subCategories}) => {
	return (
		 <Meta
				title="Categories Page"
		 >
			 <AdminLayout>
				 <SubCategoriesPage categories={categories} subCategories={subCategories}/>
			 </AdminLayout>
		 </Meta>
	);
};

export default SubCategories;


export async function getServerSideProps() {
	const {data: categories} = await CategoriesService.getAll();
	const {data: subCategories} = await SubCategoriesService.getAll();
	return {
		props: {
			categories,
			subCategories,
		}
	}
}
