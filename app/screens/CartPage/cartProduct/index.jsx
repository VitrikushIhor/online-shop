import styles from "./styles.module.scss";
import {MdOutlineKeyboardArrowRight} from "react-icons/md";
import {AiOutlineDelete} from "react-icons/ai";
import {BsHeart} from "react-icons/bs";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {updateCart} from "../../../store/cartSlice";


export const CartProduct = ({product, selected, setSelected}) => {
	const {cart} = useSelector((state) => ({...state}));
	const [active, setActive] = useState();
	const dispatch = useDispatch()

	const handleSelect = () => {
		const check = selected.find(item => item._uid === product._uid)
		if (check) {
			setSelected(selected.filter(item => item._uid !== product._uid))
		} else {
			setSelected([...selected, product])
		}
	}

	const updateQty = (type) => {
		let newCart = cart.cartItems.map((item) => {
			if (item._uid === product._uid) {
				return {
					...item,
					qty: type === "plus" ? item.qty + 1 : item.qty - 1
				}
			}
			return item
		});
		dispatch(updateCart(newCart))
	}

	const removeProduct = (id) => {
		let newCart = cart.cartItems.filter
		((item) => item._uid !== id);
		dispatch(updateCart(newCart))
	}


	useEffect(() => {
		const check = selected.find(item => item._uid === product._uid)
		setActive(check)
	}, [selected])

	return (
		 <div className={`${styles.card} ${styles.product}`}>
			 {product.quantity < 1 && <div className={styles.blur}></div>}
			 <div className={styles.product__header}>
				 <img src="../../../images/store.webp" alt=""/>
				 Shoppay Official Store
			 </div>
			 <div className={styles.product__image}>
				 <div
						className={`${styles.checkbox} ${active ? styles.active : ""}`}
						onClick={() => handleSelect()}
				 ></div>
				 <img src={product.images[0].url} alt=""/>
				 <div className={styles.col}>
					 <div className={styles.grid}>
						 <h1>
							 {product.name.length > 30
									? `${product.name.substring(0, 30)}`
									: product.name}
						 </h1>
						 <div style={{zIndex: "2"}}>
							 <BsHeart/>
						 </div>
						 <div
								style={{zIndex: "2"}}
								onClick={() => removeProduct(product._uid)}
						 >
							 <AiOutlineDelete/>
						 </div>
					 </div>
					 <div className={styles.product__style}>
						 <img src={product.color.image} alt=""/>
						 {product.size && <span>{product.size}</span>}
						 {product.price && <span>{product.price.toFixed(2)} $</span>}
						 <MdOutlineKeyboardArrowRight/>
					 </div>
					 <div className={styles.product__priceQty}>
						 <div className={styles.product__priceQty_price}>
              <span className={styles.price}>
                USD {(product.price * product.qty).toFixed(2)}$
              </span>
							 {product.price !== product.priceBeforeDiscount && (
									<span className={styles.priceBefore}>
                  USD{product.priceBeforeDiscount}$
                </span>
							 )}
							 {product.discount > 0 && (
									<span className={styles.discount}>-{product.discount}%</span>
							 )}
						 </div>
						 <div className={styles.product__priceQty_qty}>
							 <button
									disabled={product.qty < 2}
									onClick={() => updateQty("minus")}
							 >
								 -
							 </button>
							 <span>{product.qty}</span>
							 <button
									disabled={product.qty == product.quantity}
									onClick={() => updateQty("plus")}
							 >
								 +
							 </button>
						 </div>
					 </div>
					 <div className={styles.product__shipping}>
						 {product.shipping
								? `+${product.shipping}$ Shipping fee`
								: "Free Shipping"}
					 </div>
					 {product.quantity < 1 && (
							<div className={styles.notAvailable}>
								This product is out of stock, Add it to your whishlist it may get
								restocked.
							</div>
					 )}
				 </div>
			 </div>
		 </div>
	);
};

