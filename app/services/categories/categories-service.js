import axios from "axios";


export const CategoriesService = {
	async getAll() {
		try {
			const url = `${process.env.BASE_URL}/api/categories`;
			return await axios.get(url);
		} catch (e) {
			console.log(e);
		}
	},
	async createCategory({name}) {
		const url = `/api/admin/category`;
		const data = await axios.post(url, {
			name
		});
		return data;
	},
	async deleteCategory({id}) {
		const url = `/api/admin/category`;
		const data = await axios.delete(url, {
			data: {id}
		});
		return data;
	},
	async updateCategory({id, name}) {
		const url = `/api/admin/category`;
		const data = await axios.put(url, {
			id,
			name,
		});
		return data;
	}
};
