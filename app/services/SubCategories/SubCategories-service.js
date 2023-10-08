import axios from "axios";


export const SubCategoriesService = {
	async getAll() {
		try {
			const url = `${process.env.BASE_URL}/api/SubCategories`;
			return await axios.get(url);
		} catch (e) {
			console.log(e);
		}
	},

	async createSubCategory({name, parent}) {
		const url = `/api/admin/subCategory`;
		return await axios.post(url, {name, parent});
	},
};
