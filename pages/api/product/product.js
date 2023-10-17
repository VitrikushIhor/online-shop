import db from "../../../app/utils/db";
import handler from "../products";
import Product from "../../../app/backendTools/models/Product";
import User from "../../../app/backendTools/models/UserModel";
import SubCategory from "../../../app/backendTools/models/SubCategory";
import Category from "../../../app/backendTools/models/Category";

handler.post(async (req, res) => {
	try {
		await db.connectDb();
		const {slug, style, size} = req.body;
		let product = await Product.findOne({slug})
			 .populate({path: "category", model: Category})
			 .populate({path: "subCategories", model: SubCategory})
			 .populate({path: "reviews.reviewBy", model: User})
			 .lean();
		let subProduct = product.subProducts[style];
		let prices = subProduct.sizes
			 .map((s) => {
				 return s.price;
			 })
			 .sort((a, b) => {
				 return a - b;
			 });
		let newProduct = {
			...product,
			style,
			images: subProduct.images,
			sizes: subProduct.sizes,
			discount: subProduct.discount,
			sku: subProduct.sku,
			colors: product.subProducts.map((p) => {
				return p.color;
			}),
			priceRange: subProduct.discount
				 ? `From ${(prices[0] - prices[0] / subProduct.discount).toFixed(2)} to ${(
						prices[prices.length - 1] -
						prices[prices.length - 1] / subProduct.discount
				 ).toFixed(2)}$`
				 : `From ${prices[0]} to ${prices[prices.length - 1]}$`,
			price:
				 subProduct.discount > 0
						? (
							 subProduct.sizes[size].price -
							 subProduct.sizes[size].price / subProduct.discount
						).toFixed(2)
						: subProduct.sizes[size].price,
			priceBefore: subProduct.sizes[size].price,
			quantity: subProduct.sizes[size].qty,
			ratings: [
				{
					percentage: calculatePercentage("5"),
				},
				{
					percentage: calculatePercentage("4"),
				},
				{
					percentage: calculatePercentage("3"),
				},
				{
					percentage: calculatePercentage("2"),
				},
				{
					percentage: calculatePercentage("1"),
				},
			],
			reviews: product.reviews.reverse(),
			allSizes: product.subProducts
				 .map((p) => {
					 return p.sizes;
				 })
				 .flat()
				 .sort((a, b) => {
					 return a.size - b.size;
				 })
				 .filter(
						(element, index, array) =>
							 array.findIndex((el2) => el2.size === element.size) === index
				 ),
		};
		const related = await Product.find({category: product.category._id}).lean();

		//------------
		function calculatePercentage(num) {
			return (
				 (product.reviews.reduce((a, review) => {
							return (
								 a +
								 (review.rating == Number(num) || review.rating == Number(num) + 0.5)
							);
						}, 0) *
						100) /
				 product.reviews.length
			).toFixed(1);
		}

		res.status(200).json(newProduct, related);
	} catch (error) {
		res.status(500).json({message: error.message});
	} finally {
		await db.disconnectDb();
	}
});
export default handler;
