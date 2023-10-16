import styles from "../../app/screens/ProfilePages/ProfilePage/styles.module.scss";
import {useState} from "react";
import axios from "axios";
import {toast} from "react-toastify";
import {ProfileLayout} from "../../app/components/layouts/profileLayout";
import {Payment} from "../../app/screens/CheckOutPage/payment";
import {getSession} from "next-auth/react";
import User from "../../app/backendTools/models/UserModel";
import Meta from "../../app/components/meta";
import {Header} from "../../app/components/header";
import {Footer} from "../../app/components/footer";


const PaymentPage = ({user, tab, defaultPaymentMethod}) => {

	const [dbPM, setDbPM] = useState(defaultPaymentMethod);
	const [paymentMethod, setPaymentMethod] = useState(defaultPaymentMethod);

	const handlePM = async () => {
		try {
			const {data} = await axios.put("/api/user/change-pm", {
				paymentMethod,
			});
			setDbPM(data.paymentMethod);
			window.location.reload(false);
		} catch (error) {
			toast.error(error.response.data.message);
		}
	};

	return (
		 <Meta
				title="Payment Methods"
				description="Payment Methods Page"
		 >
			 <Header/>
			 <ProfileLayout session={user.user} tab={tab}>
				 <div className={styles.header}>
					 <h1>MY PAYMENT METHODS</h1>
				 </div>
				 <Payment
						paymentMethod={paymentMethod}
						setPaymentMethod={setPaymentMethod}
						profile
				 />
				 <button
						disabled={!paymentMethod || paymentMethod == dbPM}
						className={`${styles.button} ${
							 !paymentMethod || paymentMethod == dbPM ? styles.disabled : ""
						}`}
						onClick={() => handlePM()}
				 >
					 Save
				 </button>
			 </ProfileLayout>
			 <Footer/>
		 </Meta>

	);
};

export default PaymentPage;

export async function getServerSideProps(ctx) {
	const {query, req} = ctx;
	const session = await getSession({req});
	const tab = query.tab || 0;
	//-----------------
	const user = await User.findById(session.user.id).select(
		 "defaultPaymentMethod"
	);
	return {
		props: {
			user: session,
			tab,
			defaultPaymentMethod: user.defaultPaymentMethod,
		},
	};
}
