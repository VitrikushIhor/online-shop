import db from "../../../app/utils/db";
import nc from "next-connect";
import User from "../../../app/backendTools/models/UserModel";
import Order from "../../../app/backendTools/models/Order";

const handler = nc();

handler.get(async (req, res) => {
	try {

		await db.connectDb();

		const orders = await Order.find({})
			 .populate({path: "user", model: User, select: "name email image"})
			 .sort({createdAt: -1})
			 .lean();
		res.status(200).json(orders);

	} catch (error) {
		res.status(500).json({message: error.message});
	} finally {
		await db.disconnectDb();
	}
});


export default handler;
