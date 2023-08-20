import styles from "./styles.module.scss"
import {MdSecurity} from "react-icons/md";
import {BsSuitHeart} from "react-icons/bs";
import {RiAccountCircleLine, RiArrowDropDownFill} from "react-icons/ri";
import Link from "next/link";
import {useState} from "react";
import {UserMenu} from "./UserMenu";

export const Top = ({country}) => {
	const [logIn, setLogIn] = useState(true);
	const [visible, setVisible] = useState(false);
	return (
		 <div className={styles.top}>
			 <div className={styles.top__container}>
				 <div></div>
				 <ul className={styles.top__list}>
					 <li className={styles.li}>
						 <img src={country.flag} alt=""/>
						 <span>{country.name}</span>
					 </li>
					 <li className={styles.li}>
						 <MdSecurity/>
						 <span>Buyer Protection</span>
					 </li>
					 <li className={styles.li}>
						 <span>Customer Service</span>
					 </li>
					 <li className={styles.li}>
						 <span>Help</span>
					 </li>
					 <li className={styles.li}>
						 <BsSuitHeart/>
						 <Link href={"/profile/wishlist"}>
							 <span>WishList</span>
						 </Link>
					 </li>
					 <li
							onMouseOver={() => setVisible(true)}
							onMouseLeave={() => setVisible(false)}
							className={styles.li}>
						 {logIn ? <li className={styles.li}>
							 <div className={styles.flex}>
								 <img
										src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/1024px-User-avatar.svg.png"
										alt=""/>
								 <span>Ihor</span>
								 <RiArrowDropDownFill/>
							 </div>
						 </li> : <li className={styles.li}>
							 <div className={styles.flex}>
								 <RiAccountCircleLine/>
								 <span>Account</span>
								 <RiArrowDropDownFill/>
							 </div>
						 </li>}
						 {visible && <UserMenu logIn={logIn}/>}
					 </li>
				 </ul>
			 </div>
		 </div>
	);
};

