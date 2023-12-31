import styles from "./styles.module.scss";
import {useDispatch, useSelector} from "react-redux";
import {toggleSidebar} from "../../../store/expandSlice";
import {MdArrowForwardIos, MdOutlineCategory, MdSpaceDashboard} from "react-icons/md";
import {useSession} from "next-auth/react";
import Link from "next/link";
import {IoListCircleSharp} from "react-icons/io5";
import {ImUsers} from "react-icons/im";
import {FaThList} from "react-icons/fa";
import {BsPatchPlus} from "react-icons/bs";
import {RiCoupon3Fill, RiLogoutCircleFill} from "react-icons/ri";
import {useRouter} from "next/router";

export const AdminSidebar = () => {
	const router = useRouter();
	const route = router.pathname.split("/admin/dashboard/")[1];

	const {data} = useSession();
	const dispatch = useDispatch();

	const {expandSidebar} = useSelector((state) => ({...state.expand}));

	const handlerExpand = () => {
		dispatch(toggleSidebar());
	}
	return (
		 <div className={`${styles.sidebar} ${expandSidebar ? styles.opened : ""}`}>

			 <div className={styles.sidebar__toggle} onClick={() => handlerExpand()}>
				 <div
						style={{
							transform: `${expandSidebar ? "rotate(180deg)" : ""}`,
							transition: "all 3s",
						}}
				 >
					 <MdArrowForwardIos/>
				 </div>
			 </div>
			 <div class={styles.sidebar__container}>
				 <div className={styles.sidebar__header}>
					 <span></span>
					 <span></span>
					 <span></span>
				 </div>
				 <div class={styles.sidebar__user}>
					 <img src={data?.user.image || ""} alt=""/>
					 <div class={styles.show}>
						 <span> Welcome Back</span>{" "}
						 <span>{data?.user.name}</span>
					 </div>
				 </div>
				 <ul className={styles.sidebar__list}>
					 <li className={route == undefined ? styles.active : ""}>
						 <Link href="/admin/dashboard">
							 <a>
								 <MdSpaceDashboard/>
								 <span className={styles.show}>Dashboard</span>
							 </a>
						 </Link>
					 </li>
					 <li className={route == "orders" ? styles.active : ""}>
						 <Link href="/admin/dashboard/orders">
							 <a>
								 <IoListCircleSharp/>
								 <span className={styles.show}>Orders</span>
							 </a>
						 </Link>
					 </li>
					 <li className={route == "users" ? styles.active : ""}>
						 <Link href="/admin/dashboard/users">
							 <a>
								 <ImUsers/>
								 <span className={styles.show}>Users</span>
							 </a>
						 </Link>
					 </li>
					 {/*<li className={route == "messages" ? styles.active : ""}>*/}
					 {/* <Link href="/admin/dashboard/messages">*/}
					 {/*	 <a>*/}
					 {/*		 <AiFillMessage/>*/}
					 {/*		 <span className={styles.show}>Messages</span>*/}
					 {/*	 </a>*/}
					 {/* </Link>*/}
					 {/*</li>*/}
				 </ul>
				 <div className={styles.sidebar__dropdown}>
					 <div className={styles.sidebar__dropdown_heading}>
						 <div className={styles.show}>Product</div>
					 </div>
					 <ul className={styles.sidebar__list}>
						 <li className={route == "product/all" ? styles.active : ""}>
							 <Link href="/admin/dashboard/allProducts">
								 <a>
									 <FaThList/>
									 <span className={styles.show}>All Products</span>
								 </a>
							 </Link>
						 </li>
						 <li className={route == "product/create" ? styles.active : ""}>
							 <Link href="/admin/dashboard/createProduct">
								 <a>
									 <BsPatchPlus/>
									 <span className={styles.show}>Create Product</span>
								 </a>
							 </Link>
						 </li>
					 </ul>
				 </div>
				 <div className={styles.sidebar__dropdown}>
					 <div className={styles.sidebar__dropdown_heading}>
						 <div className={styles.show}>Categories / Subs</div>
					 </div>
					 <ul className={styles.sidebar__list}>
						 <li className={route == "categories" ? styles.active : ""}>
							 <Link href="/admin/dashboard/categories">
								 <a>
									 <MdOutlineCategory/>
									 <span className={styles.show}>Categories</span>
								 </a>
							 </Link>
						 </li>
						 <li className={route == "subCategories" ? styles.active : ""}>
							 <Link href="/admin/dashboard/subCategories">
								 <a>
									 <div style={{transform: "rotate(180deg)"}}>
										 <MdOutlineCategory/>
									 </div>
									 <span className={styles.show}>Sub-Categories</span>
								 </a>
							 </Link>
						 </li>
					 </ul>
				 </div>
				 <div className={styles.sidebar__dropdown}>
					 <div className={styles.sidebar__dropdown_heading}>
						 <div className={styles.show}>Coupons</div>
					 </div>
					 <ul className={styles.sidebar__list}>
						 <li className={route == "coupons" ? styles.active : ""}>
							 <Link href="/admin/dashboard/coupons">
								 <a>
									 <RiCoupon3Fill/>
									 <span className={styles.show}>Coupons</span>
								 </a>
							 </Link>
						 </li>
					 </ul>
				 </div>
				 <nav>
					 <ul
							className={`${styles.sidebar__list} ${
								 expandSidebar ? styles.nav_flex : ""
							}`}
					 >
						 <li>
							 <Link href="/">
								 <a>
									 <RiLogoutCircleFill/>
								 </a>
							 </Link>
						 </li>
					 </ul>
				 </nav>
			 </div>
		 </div>
	);
};

