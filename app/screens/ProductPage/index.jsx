import styles from "./styles.module.scss";
import {ProductPageSwiper} from "../../components/productPageSwiper";
import {useState} from "react";
import {Infos} from "./Infos";
import {Reviews} from "./reviews";


export const ProductPage = ({product}) => {
	const [activeImg, setActiveImg] = useState(0);

	return (
		 <div className={styles.product}>
<div className="container">
	<div className={styles.path}>
		Home / {product.category.name}
		{product.subCategories.map((sub) => (
			 <span>/{sub.name}</span>
		))}
	</div>
	<div className={styles.product__main}>
		<ProductPageSwiper images={product.images} activeImg={activeImg} />
		<Infos product={product} setActiveImg={setActiveImg} />
	</div>
	<Reviews product={product}/>
</div>
		 </div>
	);
};

