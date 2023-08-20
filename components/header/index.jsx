import styles from "./styles.module.scss";
import {Ad} from "./Ad";
import {Top} from "./Top";
import {Main} from "./Main";


export const Header = ({country}) => {
	return (
		 <header className={styles.header}>
			 <Ad/>
			 <Top country={country}/>
			 <Main/>
		 </header>
	);
};

