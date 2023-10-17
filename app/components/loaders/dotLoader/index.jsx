import styles from "./styles.module.scss";
import DotLoader from "react-spinners/DotLoader";

export const DotLoaderSpiner = ({loading}) => {
	return (
		 <div className={styles.loader}>
			 <DotLoader color="#2f82ff" loading={loading} />
		 </div>
	);
};

