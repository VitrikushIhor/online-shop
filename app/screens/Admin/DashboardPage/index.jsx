import styles from "./styles.module.scss";
import Link from "next/link";
import {SlEye, SlHandbag} from "react-icons/sl";
import {SiProducthunt} from "react-icons/si";
import {GiTakeMyMoney} from "react-icons/gi";
import {TbUsers} from "react-icons/tb";
import * as React from "react";
import {useEffect, useState} from "react";
import {Pagination} from "@mui/material";


export const DashboardPage = ({users, orders, products}) => {

	let firstIndex = 0;
	const [pageSize, setPageSize] = useState(10);
	const [page, setPage] = useState(1);
	const [data, setData] = useState(orders.slice(firstIndex, pageSize));

	useEffect(() => {
		setData(orders.slice(0, pageSize));
	}, [pageSize]);

	const handleChange = (event, value) => {
		setPage(value);
		setData(orders.slice(firstIndex + pageSize * (value - 1), pageSize * value));
	};


	return (
		 <div>
			 <div className={styles.cards}>
				 <div className={styles.card}>
					 <div className={styles.card__icon}>
						 <TbUsers/>
					 </div>
					 <div className={styles.card__infos}>
						 <h4>+{users.length}</h4>
						 <span>Users</span>
					 </div>
				 </div>
				 <div className={styles.card}>
					 <div className={styles.card__icon}>
						 <SlHandbag/>
					 </div>
					 <div className={styles.card__infos}>
						 <h4>+{orders.length}</h4>
						 <span>Orders</span>
					 </div>
				 </div>
				 <div className={styles.card}>
					 <div className={styles.card__icon}>
						 <SiProducthunt/>
					 </div>
					 <div className={styles.card__infos}>
						 <h4>+{products.length}</h4>
						 <span>Products</span>
					 </div>
				 </div>
				 <div className={styles.card}>
					 <div className={styles.card__icon}>
						 <GiTakeMyMoney/>
					 </div>
					 <div className={styles.card__infos}>
						 <h4>+{orders.reduce((a, val) => a + val.total, 0)}$</h4>
						 <h5>
							 -
							 {orders
									.filter((o) => !o.isPaid)
									.reduce((a, val) => a + val.total, 0)}
							 $ Unpaid yet.
						 </h5>
						 <span>Total Earnings</span>
					 </div>
				 </div>
			 </div>
			 <div className={styles.data}>
				 <div className={styles.orders}>
					 <div className={styles.heading}>
						 <h2>Recent Orders</h2>
						 <Link href="/admin/dashboard/orders">View All</Link>
					 </div>
					 <table>
						 <thead>
						 <tr>
							 <td>Name</td>
							 <td>Total</td>
							 <td>Payment</td>
							 <td>Status</td>
							 <td>View</td>
						 </tr>
						 </thead>
						 <tbody>
						 {data.map((order) => (
								<tr>
									<td>{order.user.name}</td>
									<td>{order.total} $</td>
									<td>
										{order.isPaid ? (
											 <img src="../../../images/verified.webp" alt=""/>
										) : (
											 <img src="../../../images/unverified1.png" alt=""/>
										)}
									</td>
									<td>
										<div
											 className={`${styles.status} ${
													order.status == "Not Processed"
														 ? styles.not_processed
														 : order.status == "Processing"
																? styles.processing
																: order.status == "Dispatched"
																	 ? styles.dispatched
																	 : order.status == "Cancelled"
																			? styles.cancelled
																			: order.status == "Completed"
																				 ? styles.completed
																				 : ""
											 }`}
										>
											{order.status}
										</div>
									</td>
									<td>
										<Link href={`/order/${order._id}`}>
											<SlEye/>
										</Link>
									</td>
								</tr>
						 ))}
						 </tbody>
						 <div className={styles.pagination}>
							 <Pagination
									count={Math.ceil(orders.length / pageSize)}
									page={page}
									onChange={handleChange}
									variant="outlined"
									shape="rounded"/>
						 </div>
					 </table>
				 </div>
				 <div className={styles.users}>
					 <div className={styles.heading}>
						 <h2>Recent Users</h2>
						 <Link href="/admin/dashboard/users">View All</Link>
					 </div>
					 <table>
						 <tbody>
						 {users.map((user) => (
								<tr>
									<td className={styles.user}>
										<div className={styles.user__img}>
											<img src={user.image} alt=""/>
										</div>
										<td>
											<h4>{user.name}</h4>
											<span>{user.email}</span>
										</td>
									</td>
								</tr>
						 ))}
						 </tbody>
					 </table>
				 </div>
			 </div>
		 </div>
	);
};

