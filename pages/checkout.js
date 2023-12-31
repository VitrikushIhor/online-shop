import {CheckOutPage} from "../app/screens/CheckOutPage";
import {getSession} from "next-auth/react";
import {Header} from "../app/screens/CartPage/header";
import Meta from "../app/components/meta";
import {Footer} from "../app/components/footer";
import {userService} from "../app/services/user/user-service";
import {CartService} from "../app/services/cart/cart-service";

const CheckOut = ({user, cart}) => {
	return (
		 <Meta
				title="Checkout"
				description="Checkout Page"
		 >
			 <Header/>
			 <CheckOutPage cart={cart} user={user}/>
			 <Footer/>
		 </Meta>
	);
};

export default CheckOut;

export async function getServerSideProps(Context) {
	const session = await getSession(Context);

	if (!session) {
		return {
			redirect: {
				destination: "/signin",
				permanent: false,
			},
		};
	}
	const {user} = await userService.getById({userId: session?.user?.id})

	const {cart} = await CartService.getCartById({userId: session?.user?.id})
	return {
		props: {user: user, cart: cart}
	}
}
