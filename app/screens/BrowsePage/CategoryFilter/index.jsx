import styles from "./styles.module.scss";
import {FaMinus} from "react-icons/fa";
import {BsPlusLg} from "react-icons/bs";
import Card from "./Card";
import {useState} from "react";


export const CategoryFilter = ({
	                               categories,
	                               subCategories,
	                               categoryHandler,
	                               replaceQuery,
                               }) => {
	const [show, setShow] = useState(true);
	return (
		 <div className={styles.filter}>
			 <h3>
				 Category <span>{show ? <FaMinus onClick={() => setShow(prev => !prev)}/> :
					<BsPlusLg onClick={() => setShow(prev => !prev)}/>}</span>
			 </h3>
			 {show &&
					categories.map((category, i) => (
						 <Card
								key={i}
								category={category}
								subCategories={subCategories}
								categoryHandler={categoryHandler}
								replaceQuery={replaceQuery}
						 />
					))}
		 </div>
	);
};

