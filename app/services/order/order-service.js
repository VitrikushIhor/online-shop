import axios from "axios";


export const OrderService = {
	async saveOrder({products, shippingAddress, paymentMethod, total, totalBeforeDiscount, couponApplied}) {
		const url = `/api/order/create`;
		try {
			const {data} = await axios.post(url, {
				products, shippingAddress, paymentMethod, total, totalBeforeDiscount, couponApplied
			});
			return data
		} catch (error) {
			console.log(error.message);
		}
	},
	async getById({id}) {
		const url = `${process.env.BASE_URL}/api/order/${id}`;
		try {
			const {data} = await axios.get(url);
			return data
		} catch (error) {
			console.log(error.message);
		}
	},
	async payWithStripe({orderId, amount, id}) {
		const url = `/api/order/${orderId}/pay-with-stripe`;
		try {
			const {data} = await axios.post(url, {
				id,
				amount
			});
			return data
		} catch (error) {
			console.log(error.message);
		}
	},
	async payWithPayPal({orderId, details}) {
		const url = `/api/order/${orderId}/paypal`;
		try {
			const {data} = await axios.put(url, {details});
			return data
		} catch (error) {
			console.log(error.message);
		}
	},
};
