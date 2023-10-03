import nc from "next-connect";
import Product from "../../app/backendTools/models/Product";
import db from "../../app/utils/db";

const handler = nc()

handler.post(async (req, res) => {
	try {
		await db.connectDb()
		const promises = await req.body.products.map(async (p) => {
			let dbProduct = await Product.findById(p._id).lean()
			let originalPrice = dbProduct.subProducts[p.style].sizes.find(
				 (x) => x.size === p.size
			).price
			let quantity = dbProduct.subProducts[p.style].sizes.find(
				 (x) => x.size === p.size
			).price
			let discount = dbProduct.subProducts[p.style].discount
			return {
				...p,
				priceBeforeDiscount: originalPrice,
				price:
					 discount > 0
							? originalPrice - originalPrice / discount
							: originalPrice,
				discount: discount,
				quantity: quantity,
				shippingFree: dbProduct.shippingFree,
			}
		})
		await db.disconnectDb()
		const data = await Promise.all(promises)
		res.status(200).json(data)
	} catch (err) {
		res.status(404).json({message: err})
	}
})
export default handler;
