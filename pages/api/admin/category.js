import db from "../../../app/utils/db";
import Category from "../../../app/backendTools/models/Category";
import slugify from "slugify";
import nc from "next-connect";

const handler = nc();

handler.post(async (req, res) => {
	try {
		const {name} = req.body;
		console.log(name)
		await db.connectDb();

		const test = await Category.findOne({name});
		if (test) {
			return res
				 .status(400)
				 .json({message: "Category already exist, Try a different name"});
		}
		await new Category({name, slug: slugify(name)}).save();

		await db.disconnectDb();
		res.json({
			message: `Category ${name} has been created successfully.`,
			categories: await Category.find({}).sort({updatedAt: -1}),
		});
	} catch (error) {
		await db.disconnectDb();
		res.status(500).json({message: error.message});
	}
});


handler.delete(async (req, res) => {
	try {
		const {id} = req.body;
		await db.connectDb();
		await Category.findByIdAndRemove(id);
		await db.disconnectDb();
		return res.json({
			message: "Category has been deleted successfuly",
			categories: await Category.find({}).sort({updatedAt: -1}),
		});
	} catch (error) {
		res.status(500).json({message: error.message});
	}
});

handler.put(async (req, res) => {
	try {
		const {id, name} = req.body;
		await db.connectDb();
		await Category.findByIdAndUpdate(id, {name});
		await db.disconnectDb();
		return res.json({
			message: "Category has been updated successfuly",
			categories: await Category.find({}).sort({createdAt: -1}),
		});
	} catch (error) {
		res.status(500).json({message: error.message});
	}
});

export default handler;
