import styles from "./styles.module.scss";
import {CategoriesListItem} from "./CategoriesListItem";


export const CategoriesList = ({categories, setCategories}) => {
	return (
		 <ul className={styles.list}>
			 {categories.map((category) => (
					<CategoriesListItem
						 category={category}
						 key={category._id}
						 setCategories={setCategories}
					/>
			 ))}
		 </ul>
	);
};

