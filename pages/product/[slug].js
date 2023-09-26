import {ProductPage} from "../../app/screens/ProductPage";
import Meta from "../../app/components/meta";
import {Layout} from "../../app/components/layout";
import {ProductsService} from "../../app/services/products/products-service";

const Product = ({product}) => {
	return (
		<Meta 					title={product.name}
		               description={product.brand}>
			<Layout>
				<ProductPage product={product}/>
			</Layout>
		</Meta>
	);
};

export default Product;



export async function getServerSideProps(context) {
	const {query} = context;
	const slug = query.slug;
	const style = query.style;
	const size = query.size || 0;
	let data;
try {
	const res = await ProductsService.getBySlug({slug, style, size});
	data = res.data;
}catch (e){

}

	return {
		props: {
			product:data,
		}
	}
}
