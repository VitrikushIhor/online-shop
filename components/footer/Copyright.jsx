import styles from "./styles.module.scss";
import Link from "next/link";
import {IoLocationSharp} from "react-icons/io5";


export const Copyrigth = ({country}) => {
	return (
		 <div className={styles.footer__copyright}>
			 <section>©2023 SHOPPAY All Rights Resereved</section>
			 <section>
				 <ul>
					 {
						 data.map((link, index) => (
								<li key={link.name + index}>
									<Link href={link.link}>
										{link.name}
									</Link>
								</li>
						 ))
					 }
					 <li>
						 <a>
							 <IoLocationSharp/> {country.name}
						 </a>
					 </li>
				 </ul>
			 </section>
		 </div>
	);
};

const data = [
	{
		name: "Privacy Center",
		link: "",
	},
	{
		name: "Privacy & Cookie Policy",
		link: "",
	},
	{
		name: "Manage Cookies",
		link: "",
	},
	{
		name: "Terms & Conditions",
		link: "",
	},
	{
		name: "Copyright Notice",
		link: "",
	},
];
