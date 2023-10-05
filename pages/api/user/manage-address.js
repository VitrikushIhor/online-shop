import db from "../../../app/utils/db";
import User from "../../../app/backendTools/models/UserModel";
import nc from "next-connect";
import auth from "../../../app/backendTools/middleware/auth";

const handler = nc().use(auth);

handler.put(async (req, res) => {
	try {
		await db.connectDb();
		const {addressId} = req.body;
		const user = await User.findById(req.user);
		const updatedAddresses = user.address.map(address => {
			return {
				...address.toObject(),
				active: address._id == addressId
			};
		});
		await user.updateOne({address: updatedAddresses}, {new: true});
		await db.disconnectDb();
		console.log(updatedAddresses);
		return res.json({addresses: updatedAddresses});
	} catch (error) {
		console.error(error);
		return res.status(500).json({message: "Помилка сервера"});
	}
});


handler.delete(async (req, res) => {
	try {
		await db.connectDb();
		const {id} = req.body;
		const user = await User.findById(req.user);
		await user.updateOne(
			 {
				 $pull: {address: {_id: id}},
			 },
			 {new: true}
		);
		await db.disconnectDb();
		res.json({addresses: user.address.filter((a) => a._id != id)});
	} catch (error) {
		return res.status(500).json({message: error.message});
	}
});

export default handler;
