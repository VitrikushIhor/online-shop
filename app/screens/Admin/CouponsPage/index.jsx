import {useState} from "react";
import {CreateCoupon} from "./CreateCoupon";
import {CouponsListItem} from "./CouponsListItem";
import styles from "./CouponsListItem/styles.module.scss"

export const CouponsPage = ({coupons}) => {
	const [data, setData] = useState(coupons)
	return (
		 <div>
			 <CreateCoupon setCoupons={setData}/>
			 <ul className={styles.list}>
				 {coupons.map((coupon) => (
						<CouponsListItem coupon={coupon} key={coupon._id} setCoupons={setData}/>
				 ))}
			 </ul>
		 </div>
	);
};

