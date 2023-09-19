import styles from "./styles.module.scss";
import {Swiper, SwiperSlide} from 'swiper/react';

import 'swiper/css';
import 'swiper/css/pagination';
import {Autoplay, Pagination} from 'swiper';

export const MainSwiper = () => {




	return (
<section className={styles.swiper}>
	<Swiper
		 spaceBetween={30}
		 pagination={{
			 clickable: true,
		 }}
		 autoplay={{
			 delay: 2000,
			 disableOnInteraction: false,
		 }}
		 modules={[Pagination,Autoplay]}
		 className="mySwiper"
	>
		{[...Array(10).keys()].map((i) => (
			 <SwiperSlide>
				 <img src={`../../../images/swiper/${i + 1}.jpg`} alt="" />
			 </SwiperSlide>
		))}
	</Swiper>
</section>
	);
};

