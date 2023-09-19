import {Layout} from "../app/components/layout";
import {IPService} from "../app/services/Ip-service";
import {useDispatch} from "react-redux";
import {setCountry} from "../app/store/globalSlice";
import Meta from "../app/components/meta";
import {HomePage} from "../app/screens/HomePage";

export default function Home({country}) {
	const dispatch = useDispatch()
	dispatch(setCountry(country))
	return (
		 <Layout>
			 <Meta
					title="ShopPay"
					description="Home Page"
			 >
				 <HomePage/>
			 </Meta>
		 </Layout>
	)
}
export async function getServerSideProps() {
	let data;
	try {
		const response = await IPService.getCountryFromIP();
		data = response.data.location.country;
	} catch (err) {
		console.log(err);
	}

	return {
		props: {
			country: { name: data.name, flag: data.flag.emojitwo }
		}
	};
}
