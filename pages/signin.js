import {LoginInput} from "../app/components/inputs/loginInput";
import {SingInPage} from "../app/screens/SignIn";
import {Layout} from "../app/components/layout";
import Meta from "../app/components/meta";
import {getCsrfToken, getProviders, getSession} from "next-auth/react";

const SignIn = ({providers,csrfToken,callbackUrl}) => {

	return (
	<Layout>
		<Meta
			 title="ShopPay"
			 description="Authorozation"
		>
		<SingInPage providers={providers} csrfToken={csrfToken} callbackUrl={callbackUrl}/>
		</Meta>
	</Layout>
	);
};

export default SignIn


export async function getServerSideProps(context) {
	const { req, query } = context;

	const session = await getSession({ req });
	const { callbackUrl } = query;
	if (session) {
		return {
			redirect: {
				destination: callbackUrl,
			},
		};
	}

	const csrfToken = await getCsrfToken(context);
	const providers = Object.values(await getProviders());
	return {
		props: {
			providers,
			csrfToken,
			callbackUrl:callbackUrl || "/",
		},
	};
}
