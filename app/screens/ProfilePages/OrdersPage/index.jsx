import styles from "./styles.module.scss";
import {ProfileLayout} from "../../../components/layouts/profileLayout";
import {ordersLinks} from "../../../data/profile";
import slugify from "slugify";
import Link from "next/link";
import {FiExternalLink} from "react-icons/fi";
import {useRouter} from "next/router";


export const OrdersPage = ({user, tab, orders}) => {
	const router = useRouter();
	return (
		 <ProfileLayout session={user?.user} tab={tab}>
			 <div className={styles.orders}>
				 <div className={styles.header}>
					 <h1>MY ORDERS</h1>
				 </div>
				 <nav>
					 <ul>
						 {ordersLinks.map((link, i) => (
								<li
									 key={i}
									 className={
										 slugify(link.name, {lower: true}) ==
										 router.query.q.split("__")[0]
												? styles.active
												: ""
									 }
								>
									<Link
										 href={`/profile/orders?tab=${tab}&q=${slugify(link.name, {
											 lower: true,
										 })}__${link.filter}`}
									>
										{link.name}
									</Link>
								</li>
						 ))}
					 </ul>
				 </nav>
				 <table>
					 <thead>
					 <tr>
						 <td>Order id</td>
						 <td>Products</td>
						 <td>Payment Method</td>
						 <td>Total</td>
						 <td>Paid</td>
						 <td>Status</td>
						 <td>view</td>
					 </tr>
					 </thead>
					 <tbody>
					 {orders.map((order) => (
							<tr>
								<td>{order._id}</td>
								<td className={styles.orders__images}>
									{order.products.map((p) => (
										 <img src={p.image} key={p._id} alt=""/>
									))}
								</td>
								<td>
									{order.paymentMethod == "paypal"
										 ? "Paypal"
										 : order.paymentMethod == "credit_card"
												? "Credit Card"
												: "COD"}
								</td>
								<td>{order.total}$</td>
								<td className={styles.orders__paid}>
									{order.isPaid ? (
										 <img src="../../../images/verified.png" alt=""/>
									) : (
										 <img src="../../../images/unverified.png" alt=""/>
									)}
								</td>
								<td>{order.status}</td>
								<td>
									<Link href={`/order/${order._id}`}>
										<FiExternalLink/>
									</Link>
								</td>
							</tr>
					 ))}
					 </tbody>
				 </table>
			 </div>
		 </ProfileLayout>
	);
};

