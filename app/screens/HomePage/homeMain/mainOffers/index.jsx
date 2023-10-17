import styles from "./styles.module.scss";
import {Swiper, SwiperSlide} from "swiper/react";
import {Pagination} from "swiper";
import 'swiper/css';
import 'swiper/css/pagination';
import Link from "next/link";
import {offersAarray} from "../../../../data/home";


export const MainOffers = () => {
	return (
		 <div className={styles.offers}>
			 <Swiper
				  slidesPerView={3}
				  spaceBetween={30}
				  pagination={{
					  clickable: true,
				  }}
				  modules={[Pagination]}
				  className="offersSwiper"
			 >
				 {offersAarray.map((offer,index) => (
					  <SwiperSlide key={offer.price + index}>
						  <Link href="">
							  <img src={offer.image} alt="" />
						  </Link>
						  <span>{offer.price}$</span>
						  <span>-{offer.discount}%</span>
					  </SwiperSlide>
				 ))}
			 </Swiper>
		 </div>
	);
};

