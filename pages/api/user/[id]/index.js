import nc from "next-connect";
import db from "../../../../app/utils/db";
import User from "../../../../app/backendTools/models/UserModel";

const handler = nc()

handler.get(async (req, res) => {
	try {
		await db.connectDb()
		const user = await User.findById(req.query.id);
		await db.disconnectDb()
		return res.json({user})
	} catch (e) {
		return res.status(500).json({message: e.message})
	}
})
export default handler;
