import nc from "next-connect";
import db from "../../../app/utils/db";
import User from "../../../app/backendTools/models/UserModel";


const handler = nc();

handler.get(async (req, res) => {
	try {
		await db.connectDb();
		const users = await User.find({}).sort({createdAt: -1}).lean();
		res.status(200).json(users);
	} catch (error) {
		res.status(500).json({message: error.message});
	} finally {
		await db.disconnectDb();
	}
});

export default handler;
