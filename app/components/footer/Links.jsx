import Link from "next/link";
import styles from "./styles.module.scss";

export const Links = () => {
	return (
		 <div className={styles.footer__links}>
			 {links.map((link, i) => (
					<ul>
						{i === 0 ? (
							 <img src="../../../logo.png" alt=""/>
						) : (
							 <b key={link.heading + i}>{link.heading}</b>
						)}
						{link.links.map((link, index) => (
							 <li key={index}>
								 <Link href={link.link}>{link.name}</Link>
							 </li>
						))}
					</ul>
			 ))}
		 </div>
	);
}
const links = [
	{
		heading: "SHOPPAY",
		links: [
			{
				name: "About us",
				link: "",
			},
			{
				name: "Contact us",
				link: "",
			},
			{
				name: "Social Responsibility",
				link: "",
			},
		],
	},
	{
		heading: "HELP & SUPPORT",
		links: [
			{
				name: "Shipping Info",
				link: "",
			},
			{
				name: "Returns",
				link: "",
			},
			{
				name: "How To Order",
				link: "",
			},
			{
				name: "How To Track",
				link: "",
			},
			{
				name: "Size Guide",
				link: "",
			},
		],
	},
	{
		heading: "Customer service",
		links: [
			{
				name: "Customer service",
				link: "",
			},
			{
				name: "Terms and Conditions",
				link: "",
			},
			{
				name: "Consumers (Transactions)",
				link: "",
			},
			{
				name: "Take our feedback survey",
				link: "",
			},
		],
	},
];

