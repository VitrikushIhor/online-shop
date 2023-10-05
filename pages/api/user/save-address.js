import nc from "next-connect";
import db from "../../../app/utils/db";
import User from "../../../app/backendTools/models/UserModel";
import auth from "../../../app/backendTools/middleware/auth";

const handler = nc().use(auth);

handler.post(async (req, res) => {
	try {
		await db.connectDb();
		const {address} = req.body;
		const user = await User.findById(req.user);

		user.address.push(address);
		await user.save();

		const updatedUser = await User.findById(req.user);

		await db.disconnectDb();
		return res.json({addresses: updatedUser.address});
	} catch (error) {
		return res.status(500).json({message: error.message});
	}
});
export default handler;
