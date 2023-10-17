import styles from "./styles.module.scss";
import {Links} from "./Links";
import {Socials} from "./Socials";
import {NewsLetter} from "./NewsLetter";
import {Payment} from "./Payment";
import {Copyrigth} from "./Copyright";
import axios from "axios";


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

export async function getServerSideProps() {
	let data = await axios.get("https://api.ipregistry.co/?key=d46oao4p1nsuv22l").then((res) => {
		return res.data.location.country
	}).catch(err => console.log(err))
	return {
		props: {
			country: {name: data.name, flag: data.flag.emojitwo}
		}
	}
}
