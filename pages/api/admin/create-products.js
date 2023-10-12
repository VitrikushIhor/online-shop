import db from "../../../app/utils/db";
import nc from "next-connect";
import Product from "../../../app/backendTools/models/Product";
import Category from "../../../app/backendTools/models/Category";

const handler = nc();

handler.get(async (req, res) => {
	try {
		await db.connectDb();
		const results = await Product.find().select("name subProducts").lean();
		const categories = await Category.find().lean();
		res.status(200).json({parents: results, categories: categories});
	} catch (error) {
		res.status(500).json({message: error.message});
	} finally {
		await db.disconnectDb();
	}
});


export default handler;
