import axios from "axios";


export const userService = {
	async saveCart({cart}) {
		const url = `/api/user/save-cart`;
		try {
			const {data} = await axios.post(url, {
				cart,
			});
			return data;
		} catch (error) {
			console.log(error.message);
		}
	},

	async updateCart({products}) {
		const url = `/api/update-cart`;
		try {
			const {data} = await axios.post(url, {
				products
			});
			return data;
		} catch (error) {
			console.log(error.message);
		}
	},

	async getById({userId}) {
		const url = `${process.env.BASE_URL}/api/user/${userId}`;
		try {
			const {data} = await axios.get(url);
			return data;
		} catch (error) {
			console.log(error.message);
		}
	},

	async saveAddress({address}) {
		const url = `/api/user/save-address`;
		try {
			const {data} = await axios.post(url, {address});
			return data;
		} catch (error) {
			console.log(error.message);
		}
	},
	async changeActiveAddress({addressId}) {
		const url = `/api/user/manage-address`;
		try {
			const {data} = await axios.put(url, {addressId});
			return data;
		} catch (error) {
			console.log(error.message);
		}
	},
	async deleteAddress({id}) {
		const url = `/api/user/manage-address`;
		try {
			const {data} = await axios.delete(url, {
				data: {id},
			});
			return data
		} catch (error) {
			console.log(error.message);
		}
	},
	async applyCoupon({coupon}) {
		const url = `/api/user/apply-coupon`;
		try {
			const {data} = await axios.post(url, {
				coupon
			});
			return data
		} catch (error) {
			console.log(error.message);
		}
	},
};
