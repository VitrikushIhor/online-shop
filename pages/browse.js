import Meta from "../app/components/meta";
import {Footer} from "../app/components/footer";
import {BrowsePage} from "../app/screens/BrowsePage";
import db from "../app/utils/db";
import Product from "../app/backendTools/models/Product";
import Category from "../app/backendTools/models/Category";
import SubCategory from "../app/backendTools/models/SubCategory";
import {filterArray, randomize, removeDuplicates} from "../app/utils/compareAray";

const Browse = ({
	                categories,
	                subCategories,
	                products,
	                sizes,
	                colors,
	                brands,
	                stylesData,
	                patterns,
	                materials,
	                paginationCount,
                }) => {
	return (
		 <Meta
				title="Browse"
				description="Browse Page"
		 >
			 <BrowsePage categories={categories}
			             subCategories={subCategories}
			             products={products}
			             sizes={sizes}
			             colors={colors}
			             brands={brands}
			             stylesData={stylesData}
			             patterns={patterns}
			             materials={materials}
			             paginationCount={paginationCount}/>
			 <Footer/>
		 </Meta>
	);
};

export default Browse;

export async function getServerSideProps(ctx) {

	const {query} = ctx;
	//-------------------------------------------------->
	const searchQuery = query.search || "";
	const categoryQuery = query.category || "";
	const genderQuery = query.gender || "";
	const priceQuery = query.price?.split("_") || "";
	const shippingQuery = query.shipping || 0;
	const ratingQuery = query.rating || "";
	const sortQuery = query.sort || "";
	const pageSize = 50;
	const page = query.page || 1;

	//-----------
	const brandQuery = query.brand?.split("_") || "";
	const brandRegex = `^${brandQuery[0]}`;
	const brandSearchRegex = createRegex(brandQuery, brandRegex);
	//-----------
	//-----------
	const styleQuery = query.style?.split("_") || "";
	const styleRegex = `^${styleQuery[0]}`;
	const styleSearchRegex = createRegex(styleQuery, styleRegex);
	//-----------
	//-----------
	const patternQuery = query.pattern?.split("_") || "";
	const patternRegex = `^${patternQuery[0]}`;
	const patternSearchRegex = createRegex(patternQuery, patternRegex);
	//-----------
	//-----------
	const materialQuery = query.material?.split("_") || "";
	const materialRegex = `^${materialQuery[0]}`;
	const materialSearchRegex = createRegex(materialQuery, materialRegex);
	//-----------
	const sizeQuery = query.size?.split("_") || "";
	const sizeRegex = `^${sizeQuery[0]}`;
	const sizeSearchRegex = createRegex(sizeQuery, sizeRegex);
	//-----------
	const colorQuery = query.color?.split("_") || "";
	const colorRegex = `^${colorQuery[0]}`;
	const colorSearchRegex = createRegex(colorQuery, colorRegex);
	//-------------------------------------------------->
	const search =
		 searchQuery && searchQuery !== ""
				? {
					name: {
						$regex: searchQuery,
						$options: "i",
					},
				}
				: {};
	const category =
		 categoryQuery && categoryQuery !== "" ? {category: categoryQuery} : {};

	const style =
		 styleQuery && styleQuery !== ""
				? {
					"details.value": {
						$regex: styleSearchRegex,
						$options: "i",
					},
				}
				: {};
	const size =
		 sizeQuery && sizeQuery !== ""
				? {
					"subProducts.sizes.size": {
						$regex: sizeSearchRegex,
						$options: "i",
					},
				}
				: {};
	const color =
		 colorQuery && colorQuery !== ""
				? {
					"subProducts.color.color": {
						$regex: colorSearchRegex,
						$options: "i",
					},
				}
				: {};
	const brand =
		 brandQuery && brandQuery !== ""
				? {
					brand: {
						$regex: brandSearchRegex,
						$options: "i",
					},
				}
				: {};
	const pattern =
		 patternQuery && patternQuery !== ""
				? {
					"details.value": {
						$regex: patternSearchRegex,
						$options: "i",
					},
				}
				: {};
	const material =
		 materialQuery && materialQuery !== ""
				? {
					"details.value": {
						$regex: materialSearchRegex,
						$options: "i",
					},
				}
				: {};
	const gender =
		 genderQuery && genderQuery !== ""
				? {
					"details.value": {
						$regex: genderQuery,
						$options: "i",
					},
				}
				: {};
	const price =
		 priceQuery && priceQuery !== ""
				? {
					"subProducts.sizes.price": {
						$gte: Number(priceQuery[0]) || 0,
						$lte: Number(priceQuery[1]) || Infinity,
					},
				}
				: {};
	const shipping =
		 shippingQuery && shippingQuery == "0"
				? {
					shipping: 0,
				}
				: {};
	const rating =
		 ratingQuery && ratingQuery !== ""
				? {
					rating: {
						$gte: Number(ratingQuery),
					},
				}
				: {};
	const sort =
		 sortQuery == ""
				? {}
				: sortQuery == "popular"
					 ? {rating: -1, "subProducts.sold": -1}
					 : sortQuery == "newest"
							? {createdAt: -1}
							: sortQuery == "topSelling"
								 ? {"subProducts.sold": -1}
								 : sortQuery == "topReviewed"
										? {rating: -1}
										: sortQuery == "priceHighToLow"
											 ? {"subProducts.sizes.price": -1}
											 : sortQuery == "priceLowToHigh"
													? {"subProducts.sizes.price": 1}
													: {};
	//-------------------------------------------------->
	//-------------------------------------------------->
	function createRegex(data, styleRegex) {
		if (data.length > 1) {
			for (var i = 1; i < data.length; i++) {
				styleRegex += `|^${data[i]}`;
			}
		}
		return styleRegex;
	}

	await db.connectDb()
	let productsDb = await Product.find({
		...search,
		...category,
		...brand,
		...style,
		...size,
		...color,
		...pattern,
		...material,
		...gender,
		...price,
		...shipping,
		...rating,
	})
		 .skip(pageSize * (page - 1))
		 .limit(pageSize)
		 .sort(sort)
		 .lean();
	let products =
		 sortQuery && sortQuery !== "" ? productsDb : randomize(productsDb);
	let categories = await Category.find().lean();
	let subCategories = await SubCategory.find()
		 .populate({
			 path: "parent",
			 model: Category,
		 })
		 .lean();
	let colors = await Product.find({...category}).distinct(
		 "subProducts.color.color"
	);
	let brandsDb = await Product.find({...category}).distinct("brand");
	let sizes = await Product.find({...category}).distinct(
		 "subProducts.sizes.size"
	);
	let details = await Product.find({...category}).distinct("details");
	let stylesDb = filterArray(details, "Style");
	let patternsDb = filterArray(details, "Pattern Type");
	let materialsDb = filterArray(details, "Material");
	let styles = removeDuplicates(stylesDb);
	let patterns = removeDuplicates(patternsDb);
	let materials = removeDuplicates(materialsDb);
	let brands = removeDuplicates(brandsDb);
	let totalProducts = await Product.countDocuments({
		...search,
		...category,
		...brand,
		...style,
		...size,
		...color,
		...pattern,
		...material,
		...gender,
		...price,
		...shipping,
		...rating,
	});

	return {
		props: {
			categories: JSON.parse(JSON.stringify(categories)),
			subCategories: JSON.parse(JSON.stringify(subCategories)),
			products: JSON.parse(JSON.stringify(products)),
			sizes,
			colors,
			brands,
			stylesData: styles,
			patterns,
			materials,
			paginationCount: Math.ceil(totalProducts / pageSize),
		},
	};

}
