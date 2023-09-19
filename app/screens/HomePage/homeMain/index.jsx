import styles from "./styles.module.scss";
import {MainHeader} from "./mainHeader";
import {MainMenu} from "./mainMenu";
import {MainSwiper} from "./mainSwiper";
import {MainOffers} from "./mainOffers";
import {MainUser} from "./MainUser";


export const HomeMain = () => {
	return (
		 <div className={styles.main}>
			 <MainHeader/>
			 <MainMenu/>
			 <MainSwiper/>
			 <MainOffers/>
			 <MainUser/>
		 </div>
	);
};

