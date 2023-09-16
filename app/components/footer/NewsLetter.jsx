import styles from "./styles.module.scss";
import Link from "next/link";


export const NewsLetter = () => {
	return (
		 <div className={styles.footer__newsletter}>
			 <h3>Sing Up For Our Newsletter</h3>
			 <div className={styles.footer__flex}>
				 <input type="text" placeholder="Your Email Anddres"/>
				 <button className="btn_primary">Subscribe</button>
			 </div>
			 <p>
				 By clicking the SUBSCRIBE button, you are agree to our {" "}
				 <Link href="/">Privacy & Cookie Policy</Link>
			 </p>
		 </div>
	);
};

