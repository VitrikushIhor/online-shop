import styles from "./styles.module.scss";
import {BsFillPatchMinusFill, BsFillPatchPlusFill} from "react-icons/bs";
import {useState} from "react";

const sizesList = [
	"Mini",
	"Pro",
	"Max",
	"Max Pro",
	"Normal",
	"Small",
	"Medium",
	"Large",
	"Extra Large",
	"XS",
	"Full",
	"Queen",
	"King",
	"Split King",
	"Twin",
	"Twin XL",
	"S",
	"M",
	"L",
	"XL",
	"XXL",
	"3XL",
	"4XL",
	"5XL",
	"1",
	"2",
	"3",
	"4",
	"5",
	"6",
	"7",
	"8",
	"9",
	"10",
	"11",
	"12",
	"13",
	"14",
	"15",
	"16",
	"17",
	"18",
	"19",
	"20",
	"21",
	"22",
	"23",
	"24",
	"25",
	"26",
	"27",
	"28",
	"29",
	"30",
	"31",
	"32",
	"33",
	"34",
	"35",
	"36",
	"37",
	"38",
	"39",
	"40",
	"41",
	"42",
	"43",
	"44",
	"45",
	"46",
	"47",
	"48",
	"49",
	"50",
	"52",
	"53",
	"54",
	"55",
	"56",
	"57",
	"58",
	"59",
	"60",
	"61",
	"62",
];


export const Sizes = ({sizes, product, setProduct}) => {


	const [noSize, setNoSize] = useState(false);

	const handleSize = (i, e) => {
		const values = [...sizes];
		values[i][e.target.name] = e.target.value;
		setProduct({...product, sizes: values});
	};

	const handleRemove = (i) => {
		if (sizes.length > 1) {
			const values = [...sizes];
			values.splice(i, 1);
			setProduct({...product, sizes: values});
		}
	};

	return (
		 <div>
			 <div className={styles.header}>Sizes / Quantity /Price</div>
			 <button
					type="reset"
					className={styles.click_btn}
					onClick={() => {
						if (!noSize) {
							let data = sizes.map((item) => {
								return {
									qty: item.qty,
									price: item.price,
								};
							});
							setProduct({...product, sizes: data});
						} else {
							let data = sizes.map((item) => {
								return {
									size: item.size || "",
									qty: item.qty,
									price: item.price,
								};
							});
							setProduct({...product, sizes: data});
						}
						setNoSize((prev) => !prev);
					}}
			 >
				 {noSize ? "Click if product has size" : "Click if product has no size"}
			 </button>
			 {sizes
					? sizes.map((size, i) => (
						 <div className={styles.clicktoadd} key={i}>
							 <select
									name="size"
									value={noSize ? "" : size.size}
									disabled={noSize}
									style={{display: `${noSize ? "none" : ""}`}}
									onChange={(e) => handleSize(i, e)}
							 >
								 <option value="">Select a size</option>
								 {sizesList.map((s) => (
										<option value={s} key={s}>
											{s}
										</option>
								 ))}
							 </select>
							 <input
									type="number"
									name="qty"
									placeholder={noSize ? "Product Quantity" : "Size Quantity"}
									min={1}
									value={size.qty}
									onChange={(e) => handleSize(i, e)}
							 />
							 <input
									type="number"
									name="price"
									placeholder={noSize ? "Product Price" : "Size Price"}
									min={1}
									value={size.price}
									onChange={(e) => handleSize(i, e)}
							 />
							 {!noSize ? (
									<>
										<BsFillPatchMinusFill onClick={() => handleRemove(i)}/>
										<BsFillPatchPlusFill
											 onClick={() => {
												 setProduct({
													 ...product,
													 sizes: [
														 ...sizes,
														 {
															 size: "",
															 qty: "",
															 price: "",
														 },
													 ],
												 });
											 }}
										/>
									</>
							 ) : (
									""
							 )}
						 </div>
					))
					: ""}
		 </div>
	);
};

