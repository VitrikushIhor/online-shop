import nc from "next-connect";
import auth from "../../../../app/backendTools/middleware/auth";
import db from "../../../../app/utils/db";
import Order from "../../../../app/backendTools/models/Order";

const handler = nc().use(auth);

handler.put(async (req, res) => {
	await db.connectDb();
	const order = await Order.findById(req.query.id);
	if (order) {
		try {
			order.isPaid = true;
			order.paidAt = Date.now();
			order.paymentResult = {
				id: req.body.id,
				status: req.body.status,
				email_address: req.body.email_address,
			};
			const newOrder = await order.save();
			await db.disconnectDb();
			res.json({message: "Order is paid.", order: newOrder});
		} catch (e) {
			console.log(e)
		}
	} else {
		await db.disconnectDb();
		res.status(404).json({message: "Order is not found."});
	}
});

export default handler;
