import nc from "next-connect";
import db from "../../app/utils/db";
import Category from "../../app/backendTools/models/Category";
import auth from "../../app/backendTools/middleware/auth";

const handler = nc().use(auth);

handler.get(async (req, res) => {
	try {
		await db.connectDb();
		const categories = await Category.find({}).sort({updatedAt: -1}).lean();
		res.status(200).json(categories);
	} catch (error) {
		res.status(500).json({message: error.message});
	} finally {
		await db.disconnectDb();
	}
});

export default handler;
