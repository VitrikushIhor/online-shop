import nc from "next-connect";
import db from "../../../../app/utils/db";
import auth from "../../../../app/backendTools/middleware/auth";
import Order from "../../../../app/backendTools/models/Order";

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const handler = nc().use(auth);

handler.post(async (req, res) => {
	try {
		await db.connectDb();
		const {amount, id} = req.body;
		const order_id = req.query.id;

		const payment = await stripe.paymentIntents.create({
			amount: Math.round(amount * 100),
			currency: "USD",
			description: "Shoppay Official Store",
			payment_method: id,
			confirm: true,
			return_url: "https://yourwebsite.com/payment/success",
		});

		const order = await Order.findById(order_id);
		if (order) {
			order.isPaid = true;
			order.paidAt = Date.now();
			order.paymentResult = {
				id: payment.id,
				status: payment.status,
				email_address: payment.email_address,
			};

			await order.save();

			res.json({
				success: true,
			});

		} else {
			res.status(404).json({message: "Order not found"});
		}
		await db.disconnectDb();
	} catch (e) {
		await db.disconnectDb();
		res.status(500).json({message: e.message});
	}
});

export default handler;
