import axios from "axios";


export const userService = {
	async saveCart({cart,userId}) {
		const url = `/api/user/save-cart`;
		try {
			const { data } = await axios.post(url, {
				cart,
				userId
			});
			return data;
		} catch (error) {
			console.log(error.message);
		}


	},
	async updateCart({products}) {
		const url = `/api/update-cart`;
		try {
			const { data } = await axios.post(url, {
				products
			});
			return data;
		} catch (error) {
			console.log(error.message);
		}
	},
};
