import {Layout} from "../../app/components/layout";
import Meta from "../../app/components/meta";
import {ForgotPage} from "../../app/screens/Forgot";


const Forgot = () => {
	return (
		 <Layout>
			 <Meta
					title="ShopPay"
					description="Forgot Password"
			 >
				 <ForgotPage/>
			 </Meta>
		 </Layout>
	);
};

export default Forgot
