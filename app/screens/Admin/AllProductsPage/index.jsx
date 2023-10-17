import styles from "./styles.module.scss";
import {ProductCard} from "./ProductCard";


export const AllProductsPage = ({products}) => {
	return (
		 <>
			 <div className={styles.header}>All Products</div>
			 {products.map((product) => (
					<ProductCard product={product} key={product._id}/>
			 ))}
		 </>
	);
};

