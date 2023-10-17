import axios from "axios";


export const CouponsService = {
	async getAll() {
		try {
			const url = `${process.env.BASE_URL}/api/coupons`;
			return await axios.get(url);
		} catch (e) {
			console.log(e);
		}
	},
	async createCoupon({coupon, discount, startDate, endDate}) {
		const url = "/api/admin/coupon";
		const data = await axios.post(url, {
			coupon,
			discount,
			startDate,
			endDate
		});
		return data;
	}
};
