import styles from "./styles.module.scss";
import {sidebarData} from "../../data/profile";
import {SidebarItem} from "./SidebarItem";


export const ProfileSidebar = ({data}) => {
	return (
		 <div className={styles.sidebar}>
			 <div className={styles.sidebar__container}>
				 <img src={data.image} alt=""/>
				 <span className={styles.sidebar__name}>{data.name}</span>
				 <ul>
					 {sidebarData.map((item, i) => (
							<SidebarItem
								 kye={i}
								 item={item}
								 visible={data.tab == i.toString()}
								 index={i.toString()}
							/>
					 ))}
				 </ul>
			 </div>
		 </div>
	);
};

