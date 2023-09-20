import axios from "axios";


export const ProductsService = {
	async getAll() {
		const url = `${process.env.BASE_URL}/api/products`;
		return await axios.get(url);
	}
};
