import nc from "next-connect"
import db from "../../../app/utils/db";
import User from "../../../app/backendTools/models/UserModel";
import bcrypt from "bcrypt";


const handler = nc();


handler.put(async (req, res) => {
	try {
		await db.connectDb();
		const { userId, password } = req.body;
		const user = await User.findById(userId);
		if (!user) {
			return res.status(400).json({ message: "This Account does not exist." });
		}
		const cryptedPassword = await bcrypt.hash(password, 12);
		await user.updateOne({
			password: cryptedPassword,
		});
		res.status(200).json({ email: user.email });
		await db.disconnectDb();
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});



export default handler
