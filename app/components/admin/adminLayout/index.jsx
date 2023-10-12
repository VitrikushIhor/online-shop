import styles from "./styles.module.scss";
import {AdminSidebar} from "../adminSidebar";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";

export const AdminLayout = ({children}) => {
	const {expandSidebar} = useSelector((state) => ({...state.expand}));
	const dispatch = useDispatch();
	useEffect(() => {
		// dispatch(hideDialog());
	}, []);
	return (
		 <div className={styles.layout}>
			 <AdminSidebar/>
			 <div className={styles.layout__main}
			      style={{marginLeft: `${expandSidebar ? "280px" : "80px"}`}}>
				 {children}
			 </div>
		 </div>
	);
};

