import Link from "next/link";
import {MdPlayArrow} from "react-icons/md";
import styles from "./styles.module.scss";

export const CartHeader = () => {
	return (
		 <div className={styles.header}>
<div className={styles.header__container}>
	<div class={styles.header__left}>
		<Link href={"/"}>
			<img src="../../../../logo.png" alt="" />
		</Link>
	</div>
	<div className={styles.header__right}>
		<Link href={"/browse"}>
			<a>Continue Shopping
			<MdPlayArrow/>
			</a>
		</Link>
	</div>
</div>
		 </div>
	);
};

