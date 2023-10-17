import styles from "./styles.module.scss";
import {FaMinus} from "react-icons/fa";
import {BsPlusLg} from "react-icons/bs";
import {useState} from "react";
import {useRouter} from "next/router";
import Size from "./Size";


export const SizesFilter = ({sizes, sizeHandler}) => {

	const router = useRouter();
	const existedSize = router.query.size || "";
	const [show, setShow] = useState(true);

	return (
		 <div className={styles.filter}>
			 <h3>
				 Sizes <span>{show ? <FaMinus onClick={() => setShow(prev => !prev)}/> :
					<BsPlusLg onClick={() => setShow(prev => !prev)}/>}</span>
			 </h3>
			 {show && (
					<div className={styles.filter__sizes}>
						{sizes.map((size, i) => (
							 <div
									onClick={() =>
										 sizeHandler(existedSize ? `${existedSize}_${size}` : size)
									}
							 >
								 <Size key={i} size={size} sizeHandler={sizeHandler}/>
							 </div>
						))}
					</div>
			 )}
		 </div>
	);
};

