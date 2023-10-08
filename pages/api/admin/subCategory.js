import nc from "next-connect";
import auth from "../../../app/backendTools/middleware/auth";
import db from "../../../app/utils/db";
import SubCategory from "../../../app/backendTools/models/SubCategory";
import slugify from "slugify";

const handler = nc().use(auth);

handler.post(async (req, res) => {
	try {
		const {name, parent} = req.body;
		await db.connectDb();
		const test = await SubCategory.findOne({name});
		if (test) {
			return res
				 .status(400)
				 .json({message: "SubCategory already exist, Try a different name"});
		}
		await new SubCategory({name, parent, slug: slugify(name)}).save();

		await db.disconnectDb();
		res.json({
			message: `SubCategory ${name} has been created successfully.`,
			subCategories: await SubCategory.find({}).sort({updatedAt: -1}),
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
		await SubCategory.findByIdAndRemove(id);
		await db.disconnectDb();
		return res.json({
			message: "SubCategory has been deleted successfuly",
			subCategories: await SubCategory.find({}).sort({updatedAt: -1}),
		});
	} catch (error) {
		res.status(500).json({message: error.message});
	}
});

handler.put(async (req, res) => {
	try {
		const {id, name, parent} = req.body;
		await db.connectDb();
		await SubCategory.findByIdAndUpdate(id, {
			name,
			parent,
			slug: slugify(name),
		});
		await db.disconnectDb();
		return res.json({
			message: "SubCategory has been updated successfuly",
			subCategories: await SubCategory.find({}).sort({createdAt: -1}),
		});
	} catch (error) {
		res.status(500).json({message: error.message});
	}
});

handler.get(async (req, res) => {
	try {
		const {category} = req.query;
		if (!category) {
			return res.json([]);
		}
		await db.connectDb();
		const results = await SubCategory.find({parent: category}).select("name");
		await db.disconnectDb();
		return res.json(results);
	} catch (error) {
		res.status(500).json({message: error.message});
	}
});

export default handler;
