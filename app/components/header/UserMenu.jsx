import styles from "./styles.module.scss"
import Link from "next/link";
import {signIn, signOut} from "next-auth/react";

export const UserMenu = ({logIn}) => {
	return (
		 <div className={styles.menu}>
			 <h4>Welcome to Online-Shop</h4>
			 {
				 logIn ?
						<div className={styles.flex}>
							<img
								 src={logIn.user.image}
								 alt=""
								 className={styles.menu__img}
							/>
							<div className={styles.col}>
								<span>Welcome Back,</span>
								<h3>{logIn.user.name}</h3>
								<span onClick={()=>signOut()}>Sing Out</span>
							</div>
						</div>
						: <div className={styles.flex}>
							<button className="btn_primary" onClick={()=>signIn()}>Register</button>
							<button className="btn_outlined" onClick={()=>signIn()}>Login</button>
						</div>
			 }
			 <ul>
				 <li>
					 <Link href="/profile">Account</Link>
				 </li>
				 <li>
					 <Link href="/profile/orders">My Orders</Link>
				 </li>
				 <li>
					 <Link href="/profile/messages">Message Center</Link>
				 </li>
				 <li>
					 <Link href="/profile/address">Address</Link>
				 </li>
				 <li>
					 <Link href="/profile/wishlist">Wishlist</Link>
				 </li>
			 </ul>
		 </div>
	);
};

