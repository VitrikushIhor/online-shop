import nc from "next-connect";
import Coupon from "../../../app/backendTools/models/Coupon";
import db from "../../../app/utils/db";

const handler = nc()

handler.post(async (req, res) => {

	try {
		await db.connectDb()
		const {coupon, startDate, endDate, discount} = req.body
		const testCoupon = await Coupon.findOne({coupon})
		if (testCoupon) {
			return res.status(400).json({
				message: "This Coupon name already exists, try with a different name."
			})
		}

		await new Coupon({
			coupon,
			startDate,
			endDate,
			discount
		}).save()
		await db.disconnectDb()
		return res.json({
			message: "Coupon created successfully !",
			coupons: await Coupon.find({}),
		})
	} catch (e) {
		return res.status(500).json({message: e.message});
	}


})
export default handler;
