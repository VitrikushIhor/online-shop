import styles from "../../app/screens/ProfilePages/ProfilePage/styles.module.scss";
import {getSession} from "next-auth/react";
import User from "../../app/backendTools/models/UserModel";
import {ProfileLayout} from "../../app/components/layouts/profileLayout";
import {Shipping} from "../../app/screens/CheckOutPage/shipping";
import {useState} from "react";
import Meta from "../../app/components/meta";
import {Header} from "../../app/components/header";
import {Footer} from "../../app/components/footer";


const Address = ({user, tab}) => {
	const [addresses, setAddresses] = useState(user.address.address);
	return (
		 <Meta
				title="Addresses"
				description="Addresses Page"
		 >
			 <Header/>
			 <ProfileLayout session={user?.user} tab={tab}>
				 <div className={styles.header}>
					 <h1>MY ADDRESSES</h1>
				 </div>
				 <Shipping
						user={user}
						addresses={addresses}
						setAddresses={setAddresses}
						profile
				 />
			 </ProfileLayout>
			 <Footer/>
		 </Meta>
	);
};

export default Address;

export async function getServerSideProps(ctx) {
	const {query, req} = ctx;
	const session = await getSession({req});
	const tab = query.tab || 0;

	const address = await User.findById(session?.user.id).select("address").lean();
	return {
		props: {
			user: {
				user: session?.user,
				address: JSON.parse(JSON.stringify(address)),
			},
			tab,
		},
	};
}
