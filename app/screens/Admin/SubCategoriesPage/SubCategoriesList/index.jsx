import styles from "./styles.module.scss";
import {SubCategoriesItem} from "../SubCategoriesItem";


export const SubCategoriesList = ({categories, subCategories, setSubCategories}) => {
	return (
		 <ul className={styles.list}>
			 {subCategories.map((sub) => (
					<SubCategoriesItem
						 subCategory={sub}
						 key={sub._id}
						 setSubCategories={setSubCategories}
						 categories={categories}
					/>
			 ))}
		 </ul>
	);
};

