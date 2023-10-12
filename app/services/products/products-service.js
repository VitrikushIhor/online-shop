import axios from "axios";


export const ProductsService = {
	async getAll() {
		const url = `${process.env.BASE_URL}/api/products`;
		return await axios.get(url);
	},
	async getBySlug({slug, style, size}) {
		const url = `${process.env.BASE_URL}/api/product/product`;
		return await axios.post(url, {slug, style, size});
	},
	async getById({_id, style, size}) {
		const url = `/api/product/${_id}?style=${style}&size=${size}`;
		return await axios.get(url);
	},
	async getAllAdmin() {
		const url = `${process.env.BASE_URL}/api/admin/products`;
		return await axios.get(url);
	},
	async getAdminCategories() {
		const url = `${process.env.BASE_URL}/api/admin/create-products`;
		return await axios.get(url);
	},
};
