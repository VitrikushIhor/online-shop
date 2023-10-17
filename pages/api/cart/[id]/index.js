import nc from "next-connect";
import User from "../../../../app/backendTools/models/UserModel";
import Cart from "../../../../app/backendTools/models/Cart";
import db from "../../../../app/utils/db";

const handler = nc()

handler.get(async (req, res) => {
	try {
		await db.connectDb()
		const user = await User.findById(req.query.id);
		const cart = await Cart.findOne({user: user._id});
		await db.disconnectDb()
		return res.json({cart})
	} catch (e) {
		return res.status(500).json({message: e.message})
	}
})
export default handler;
