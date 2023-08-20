import styles from "./styles.module.scss";
import {Links} from "./Links";
import {Socials} from "./Socials";
import {NewsLetter} from "./NewsLetter";
import {Payment} from "./Payment";
import {Copyrigth} from "./Copyright";


export const Footer = () => {
	return (
		 <footer className={styles.footer}>
			 <div className={styles.footer__container}>
				 <Links/>
				 <Socials/>
				 <NewsLetter/>
				 <Payment/>
				 <Copyrigth/>
			 </div>
		 </footer>
	);
};
