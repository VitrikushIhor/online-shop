import nc from "next-connect";
import db from "../../../../app/utils/db";
import Product from "../../../../app/backendTools/models/Product";

const handler = nc()

handler.get(async (req, res) => {
	try {
		await db.connectDb()
		const id = req.query.id;
		const style = req.query.style || 0;
		const size = req.query.size || 0;
		const product = await Product.findById(id).lean()
		let discount = product.subProducts[style].discount
		let priceBeforeDiscount = product.subProducts[style].sizes[size].price
		let price = discount ? priceBeforeDiscount - priceBeforeDiscount / discount : priceBeforeDiscount
		await db.disconnectDb()
		return res.json({
			_id: product._id,
			style: Number(style),
			name: product.name,
			description: product.description,
			slug: product.slug,
			sku: product.subProducts[style].sku,
			brand: product.brand,
			category: product.category,
			subCategories: product.subCategories,
			shipping: product.shipping,
			images: product.subProducts[style].images,
			color: product.subProducts[style].color,
			size: product.subProducts[style].sizes[size].size,
			price,
			priceBeforeDiscount,
			quantity: product.subProducts[style].sizes[size].qty,
		})
	} catch (e) {
		return res.status(500).json({message: e.message})
	}
})
export default handler;
