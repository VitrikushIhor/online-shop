import nc from "next-connect";
import db from "../../../../app/utils/db";
import Order from "../../../../app/backendTools/models/Order";

const handler = nc()

handler.get(async (req, res) => {
	try {
		await db.connectDb()
		const {id} = req.query
		const order = await Order.findById(id).populate("user").lean();
		await db.disconnectDb()
		return res.json({order})
	} catch (e) {
		return res.status(500).json({message: e.message})
	}
})

export default handler;
