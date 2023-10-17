import nc from "next-connect";
import auth from "../../../app/backendTools/middleware/auth";
import db from "../../../app/utils/db";
import User from "../../../app/backendTools/models/UserModel";
import Order from "../../../app/backendTools/models/Order";

const handler = nc().use(auth);

handler.post(async (req, res) => {
	try {
		await db.connectDb();
		const {
			products,
			shippingAddress,
			paymentMethod,
			total,
			totalBeforeDiscount,
			couponApplied,
		} = req.body;
		const user = await User.findById(req.user);
		const newOrder = await new Order({
			user: user._id,
			products,
			shippingAddress,
			paymentMethod,
			total,
			totalBeforeDiscount,
			couponApplied,
		}).save();
		await db.disconnectDb();
		return res.json({
			order_id: newOrder._id,
		});
	} catch (e) {
		return res.status(500).json({message: e.message});
	}
});

export default handler;
