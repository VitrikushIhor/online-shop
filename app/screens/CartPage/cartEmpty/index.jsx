import styles from "./styles.module.scss";
import {signIn, useSession} from "next-auth/react";
import Link from "next/link";


export const CartEmpty = () => {
	const {data : session} = useSession()
	return (
		 <div className={styles.empty}>
			 <img src="../../../../images/empty.png" alt=""/>
			 <h1>Cart is Empty</h1>
			 {
				 !session &&
				  <button onClick={()=>{signIn()}} className={styles.empty__btn}>Shop Now</button>
			 }
			 <Link href={"/browse"}>
				 <a>
					 <button className={`${styles.empty__btn} ${styles.empty__btn__v2}`}>Shop Now</button>
				 </a>
			 </Link>
		 </div>
	);
};

