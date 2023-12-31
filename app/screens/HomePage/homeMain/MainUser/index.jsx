import styles from "./styles.module.scss";
import {IoSettingsOutline} from "react-icons/io5";
import {HiOutlineClipboardList} from "react-icons/hi";
import {AiOutlineMessage} from "react-icons/ai";
import Link from "next/link";
import {useSession} from "next-auth/react";
import {BsHeart} from "react-icons/bs";
import {Swiper, SwiperSlide} from "swiper/react";
import {EffectCards} from "swiper";
import 'swiper/css';
import 'swiper/css/effect-cards';
import {userSwiperArray} from "../../../../data/home";
import {useRouter} from "next/router";

export const MainUser = () => {
	const {data: session} = useSession();
	const {push} = useRouter();

	return (
		 <div className={styles.user}>
			 <img
					src="../../../images/userHeader.jpg"
					alt=""
					className={styles.user__header}
			 />
			 <div className={styles.user__container}>
				 {session ? (
						<div className={styles.user__infos}>
							<img src={session.user?.image} alt=""/>
							<h4>{session.user.name}</h4>
						</div>
				 ) : (
						<div className={styles.user__infos}>
							<img
								 src="https://res.cloudinary.com/dmhcnhtng/image/upload/v1664642478/992490_b0iqzq.png"
								 alt=""
							/>
							<div className={styles.user__infos_btns}>
								<button onClick={() => push("/signin")}>Register</button>
								<button onClick={() => push("/signin")}>Login</button>
							</div>
						</div>
				 )}
				 <ul className={styles.user__links}>
					 <li>
						 <Link href="/profile">
							 <a>
								 <IoSettingsOutline/>
							 </a>
						 </Link>
					 </li>
					 <li>
						 <Link href="">
							 <a>
								 <HiOutlineClipboardList/>
							 </a>
						 </Link>
					 </li>
					 <li>
						 <Link href="">
							 <a>
								 <AiOutlineMessage/>
							 </a>
						 </Link>
					 </li>
					 <li>
						 <Link href="/wishlist">
							 <a>
								 <BsHeart/>
							 </a>
						 </Link>
					 </li>
				 </ul>
				 <div className={styles.user__swiper}>
					 <img
							src="https://assets.stickpng.com/images/5a5a6d2414d8c4188e0b088d.png"
							alt=""
							className={styles.new}
					 />
					 <Swiper
							effect={'cards'}
							grabCursor={true}
							modules={[EffectCards]}
							className="userSwiper"
					 >
						 {userSwiperArray.map((item) => (
								<SwiperSlide>
									<Link href="">
										<img src={item.image} alt=""/>
									</Link>
								</SwiperSlide>
						 ))}
					 </Swiper>
				 </div>
			 </div>
			 <img
					src="../../../images/userHeader.jpg"
					alt=""
					className={styles.user__footer}
			 />
		 </div>
	);
};

