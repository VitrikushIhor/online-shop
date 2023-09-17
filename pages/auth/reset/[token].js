import {Layout} from "../../../app/components/layout";
import Meta from "../../../app/components/meta";
import {ResetPage} from "../../../app/screens/ResetPage";
import jwt from "jsonwebtoken";

const Reset = ({userId}) => {
	return (
		 <Layout>
			 <Meta
					title="ShopPay"
					description="Reset Password"
			 >
				 <ResetPage userId={userId}/>
			 </Meta>
		 </Layout>
	);
};

export default Reset



export async function getServerSideProps(context) {
const {query}= context
	const token = query.token
	const userId=jwt.verify(token, process.env.RESET_TOKEN_SECRET)
	return {
		props: {
			userId:userId.id
		},
	};
}
