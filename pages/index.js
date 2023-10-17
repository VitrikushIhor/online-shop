import {Layout} from "../app/components/layouts/layout";
import {useDispatch} from "react-redux";
import {setCountry} from "../app/store/globalSlice";
import Meta from "../app/components/meta";
import {HomePage} from "../app/screens/HomePage";
import {ProductsService} from "../app/services/products/products-service";
import {IPService} from "../app/services/Ip-service";

export default function Home({country, products}) {
	const dispatch = useDispatch()
	dispatch(setCountry(country))
	return (
		 <Layout>
			 <Meta
					title="ShopPay"
					description="Home Page"
			 >
				 <HomePage products={products}/>
			 </Meta>
		 </Layout>
	)
}

export async function getServerSideProps() {
	let data;
	let Products;
	try {
		const {data: products} = await ProductsService.getAll();
		const response = await IPService.getCountryFromIP();
		data = response.data.location.country;
		Products = products;
	} catch (err) {
		console.log(err);
	}

	return {
		props: {
			country: {name: data.name, flag: data.flag.emojitwo},
			products: Products,
		},
	};
}

