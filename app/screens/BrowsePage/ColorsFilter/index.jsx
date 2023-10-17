import styles from "./styles.module.scss";
import {FaMinus} from "react-icons/fa";
import {BsPlusLg} from "react-icons/bs";
import {useState} from "react";


export const ColorsFilter = ({colors, colorHandler, replaceQuery}) => {
	const [show, setShow] = useState(true);
	return (
		 <div className={styles.filter}>
			 <h3>
				 Colors <span>{show ? <FaMinus onClick={() => setShow(prev => !prev)}/> :
					<BsPlusLg onClick={() => setShow(prev => !prev)}/>}</span>
			 </h3>
			 {show && (
					<div className={styles.filter__colors}>
						{colors.map((color, i) => {
							const check = replaceQuery("color", color);
							return (
								 <button
										style={{background: `${color}`}}
										className={check.active ? styles.activeFilterColor : ""}
										onClick={() => colorHandler(check.result)}
								 ></button>
							);
						})}
					</div>
			 )}
		 </div>
	);
};

