import styles from "./styles.module.scss";
import {Shipping} from "./shipping";
import {useEffect, useState} from "react";
import {CheckOutProducts} from "./checkoutProducts";
import {Payment} from "./payment";
import {Summary} from "./summary";


export const CheckOutPage = ({cart, user}) => {
	const [addresses, setAddresses] = useState(user?.address || []);
	const [paymentMethod, setPaymentMethod] = useState("");
	const [totalAfterDiscount, setTotalAfterDiscount] = useState("")
	const [selectedAddress, setSelectedAddress] = useState();

	useEffect(() => {
		let check = addresses.find((ad) => ad.active == true);
		if (check) {
			setSelectedAddress(check);
		} else {
			setSelectedAddress("");
		}
	}, [addresses]);

	return (
		 <div className={`container ${styles.checkout}`}>
			 <div class={styles.checkout__side}>
				 <Shipping
						user={user}
						addresses={addresses}
						setAddresses={setAddresses}
				 />
				 <CheckOutProducts cart={cart}/>
			 </div>
			 <div class={styles.checkout__side}>
				 <Payment
						paymentMethod={paymentMethod}
						setPaymentMethod={setPaymentMethod}
				 />
				 <Summary
						totalAfterDiscount={totalAfterDiscount}
						setTotalAfterDiscount={setTotalAfterDiscount}
						user={user}
						cart={cart}
						paymentMethod={paymentMethod}
						selectedAddress={selectedAddress}
				 />
			 </div>
		 </div>
	);
};

