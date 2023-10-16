import {ProfileSidebar} from "../../profileSidebar";
import styles from "./styles.module.scss"

export const ProfileLayout = ({session, children, tab}) => {
	return (
		 <div className={styles.layout}>
			 <div className={styles.layout__container}>
				 <ProfileSidebar
						data={{
							...session,
							tab,
						}}
				 />
				 <div className={styles.layout__content}>{children}</div>
			 </div>
		 </div>
	);
};

