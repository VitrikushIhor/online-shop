import nc from "next-connect";
import db from "../../app/utils/db";
import Coupon from "../../app/backendTools/models/Coupon";

const handler = nc();

handler.get(async (req, res) => {
	try {
		await db.connectDb();
		const coupons = await Coupon.find({}).sort({updatedAt: -1}).lean();
		res.status(200).json(coupons);
	} catch (error) {
		res.status(500).json({message: error.message});
	} finally {
		await db.disconnectDb();
	}
});

export default handler;
