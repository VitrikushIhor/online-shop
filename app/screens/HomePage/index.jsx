import styles from "./styles.module.scss";
import {HomeMain} from "./homeMain";
import {FlashDeals} from "./flashDelals";
import {HomeCategory} from "./homeCategory";
import {
	gamingSwiper,
	homeImprovSwiper,
	women_accessories,
	women_dresses,
	women_shoes,
	women_swiper
} from "../../data/home";
import {useMediaQuery} from "react-responsive";
import {ProductsSwiper} from "../../components/ProductsSwiper";
import {ProductCart} from "../../components/productCart";


export const HomePage = ({products}) => {
	const isMedium = useMediaQuery({query: "(max-width:850px)"});
	const isMobile = useMediaQuery({query: "(max-width:550px)"});
	return (
		 <section className={styles.home}>
			 <div className="container">
				 <HomeMain/>
				 <div className={styles.home__products}>
					 {products.map((product) => (
							<ProductCart product={product} key={product._id}/>
					 ))}
				 </div>
				 <FlashDeals/>
				 <div className={styles.home__category}>

					 <HomeCategory
							header="Dresses"
							products={women_dresses}
							background="#5a31f4"
					 />
					 {!isMedium && (
							<HomeCategory
								 header="Shoes"
								 products={women_shoes}
								 background="#3c811f"
							/>
					 )}
					 {isMobile && (
							<HomeCategory
								 header="Shoes"
								 products={women_shoes}
								 background="#3c811f"
							/>
					 )}
					 <HomeCategory
							header="Accessories"
							products={women_accessories}
							background="#000"
					 />
				 </div>
				 <div style={{marginTop: "1rem"}}>
					 <ProductsSwiper products={women_swiper} header={"For Women"} bg={"#f1ff95"}/>
				 </div>
				 <div style={{marginTop: "1rem"}}>
					 <ProductsSwiper products={gamingSwiper} header={"For Gaming"} bg={"#6cc070"}/>
				 </div>
				 <div style={{marginTop: "1rem"}}>
					 <ProductsSwiper products={homeImprovSwiper} header={"For Home"} bg={"#69e6ff"}/>
				 </div>
			 </div>
		 </section>
	);
};

