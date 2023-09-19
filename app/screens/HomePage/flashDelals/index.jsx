import styles from "./styles.module.scss";
import {MdFlashOn} from "react-icons/md";
import {Countdown} from "../../../components/Countdown";
import {Swiper, SwiperSlide} from "swiper/react";
import {flashDealsArray} from "../../../data/home";
import {Navigation} from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import {FlashCard} from "./FlashCard";

export const FlashDeals = () => {
	return (
		 <div className={styles.flashDeals}>
			 <div className={styles.flashDeals__header}>
				 <h1>
					 FLASH SALE
					 <MdFlashOn />
				 </h1>
				 <Countdown date={new Date(2023, 12, 30)} />
			 </div>
			 <Swiper
				  slidesPerView={1}
				  spaceBetween={10}
				  navigation={true}
				  modules={[Navigation]}
				  className="flashDeals__swiper"
				  breakpoints={{
					  450: {
						  slidesPerView: 2,
					  },
					  630: {
						  slidesPerView: 3,
					  },
					  920: {
						  slidesPerView: 4,
					  },
					  1232: {
						  slidesPerView: 5,
					  },
					  1520: {
						  slidesPerView: 6,
					  },
				  }}
			 >
				 <div className={styles.flashDeals__list}>
					 {flashDealsArray.map((product, i) => (
						  <SwiperSlide>
							  <FlashCard product={product} key={i} />
						  </SwiperSlide>
					 ))}
				 </div>
			 </Swiper>
		 </div>
	);
};

