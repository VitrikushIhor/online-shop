import axios from "axios";


export const CartService = {
	async getCartById({userId}) {
		const url = `${process.env.BASE_URL}/api/cart/${userId}`;
		try {
			const {data} = await axios.get(url)
			return data;
		} catch (error) {
			console.log(error.message);
		}
	},

};
