import db from "../../../app/utils/db";
import nc from "next-connect";
import Product from "../../../app/backendTools/models/Product";
import Category from "../../../app/backendTools/models/Category";

const handler = nc();

handler.get(async (req, res) => {
	try {
		await db.connectDb();
		const products = await Product.find({})
			 .populate({path: "category", model: Category})
			 .sort({createdAt: -1})
			 .lean();
		res.status(200).json(products);
	} catch (error) {
		res.status(500).json({message: error.message});
	} finally {
		await db.disconnectDb();
	}
});


export default handler;
