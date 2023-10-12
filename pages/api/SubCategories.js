import nc from "next-connect";
import db from "../../app/utils/db";
import Category from "../../app/backendTools/models/Category";
import SubCategory from "../../app/backendTools/models/SubCategory";

const handler = nc();

handler.get(async (req, res) => {
	try {
		await db.connectDb();
		const subCategories = await SubCategory.find({})
			 .populate({path: "parent", model: Category})
			 .sort({updatedAt: -1})
			 .lean();
		res.status(200).json(subCategories);
	} catch (error) {
		res.status(500).json({message: error.message});
	} finally {
		await db.disconnectDb();
	}
});

export default handler;
