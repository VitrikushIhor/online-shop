import nc from "next-connect";
import db from "../../app/utils/db";
import Product from "../../app/backendTools/models/Product";

const handler = nc();

handler.get(async (req, res) => {
	try {
		await db.connectDb();
		let products = await Product.find().sort({createdAt: -1}).lean();
		res.status(200).json(products);
	} catch (error) {
		res.status(500).json({message: error.message});
	} finally {
		await db.disconnectDb();
	}
});

export default handler;
