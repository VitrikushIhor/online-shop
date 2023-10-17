import {CartPage} from "../app/screens/CartPage";
import Meta from "../app/components/meta";
import {Footer} from "../app/components/footer";
import {getSession} from "next-auth/react";
import {userService} from "../app/services/user/user-service";


const Cart = ({user}) => {
	return (
		 <Meta
				title="Order"
				description="Cart Page"
		 >
			 <CartPage user={user}/>
			 <Footer/>
		 </Meta>
	);
};

export default Cart;

export async function getServerSideProps(Context) {
	const session = await getSession(Context);

	const {user} = await userService.getById({userId: session?.user?.id})

	return {
		props: {user: user}
	}
}
