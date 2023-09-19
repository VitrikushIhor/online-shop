import styles from "./styles.module.scss";
import {
	Gi3DHammer,
	GiBallerinaShoes,
	GiBigDiamondRing,
	GiClothes,
	GiHeadphones,
	GiHealthCapsule,
	GiLargeDress,
	GiSportMedal,
	GiWatch
} from "react-icons/gi";
import {BiCameraMovie, BiCategory, BiGift} from "react-icons/bi";
import Link from "next/link";
import {HiOutlineHome} from "react-icons/hi2";
import {FaBaby} from "react-icons/fa6";
import {MdOutlineSmartToy, MdOutlineSportsEsports} from "react-icons/md";
import {BsPhoneVibrate} from "react-icons/bs";
import {AiOutlineSecurityScan} from "react-icons/ai";
import {menuArray} from "../../../../data/home";


export const MainMenu = () => {
	return (
		 <div className={styles.menu}>
			 <ul>
				 <li>
					 <a className={styles.menu__header}>
						 <BiCategory />
						 <b>Categories</b>
					 </a>
				 </li>
				 <div className={styles.menu__list}>
					 {menuArray.map((item, i) => (
							<li>
								<Link href={item.link}>
									<a>
										{i == 0 ? (
											 <GiLargeDress />
										) : i == 1 ? (
											 <GiClothes />
										) : i == 2 ? (
											 <GiHeadphones />
										) : i == 3 ? (
											 <GiWatch />
										) : i == 4 ? (
											 <HiOutlineHome />
										) : i == 5 ? (
											 <GiHealthCapsule />
										) : i == 6 ? (
											 <GiBallerinaShoes />
										) : i == 7 ? (
											 <GiBigDiamondRing />
										) : i == 8 ? (
											 <GiSportMedal />
										) : i == 9 ? (
											 <FaBaby />
										) : i == 10 ? (
											 <BiCameraMovie />
										) : i == 11 ? (
											 <MdOutlineSportsEsports />
										) : i == 12 ? (
											 <BsPhoneVibrate />
										) : i == 13 ? (
											 <MdOutlineSmartToy />
										) : i == 14 ? (
											 <BiGift />
										) : i == 15 ? (
											 <Gi3DHammer />
										) : i == 16 ? (
											 <AiOutlineSecurityScan />
										) : (
											 ""
										)}
										<span>{item.name}</span>
									</a>
								</Link>
							</li>
					 ))}
				 </div>
			 </ul>
		 </div>
	);
};

