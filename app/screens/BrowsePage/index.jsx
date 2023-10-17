import styles from "./styles.module.scss";
import Link from "next/link";
import {Pagination} from "@mui/material";
import {ProductCart} from "../../components/productCart";
import {Header} from "../../components/header";
import {CategoryFilter} from "./CategoryFilter";
import {useEffect, useRef, useState} from "react";
import {useRouter} from "next/router";
import {SizesFilter} from "./SizesFilter";
import {ColorsFilter} from "./ColorsFilter";
import BrandsFilter from "./BrandsFilter";
import StylesFilter from "./StylesFilter";
import PatternsFilter from "./PatternsFilter";
import MaterialsFilter from "./MaterialsFilter";
import GenderFilter from "./GenderFilter";
import HeadingFilters from "./HeadingFilters";


export const BrowsePage = ({
	                           categories,
	                           subCategories,
	                           products,
	                           sizes,
	                           colors,
	                           brands,
	                           stylesData,
	                           patterns,
	                           materials,
	                           paginationCount,
                           }) => {


	const router = useRouter();
	const filter = ({
		                search,
		                category,
		                brand,
		                style,
		                size,
		                color,
		                pattern,
		                material,
		                gender,
		                price,
		                shipping,
		                rating,
		                sort,
		                page,
	                }) => {
		const path = router.pathname;
		const {query} = router;
		if (search) query.search = search;
		if (category) query.category = category;
		if (brand) query.brand = brand;
		if (style) query.style = style;
		if (size) query.size = size;
		if (color) query.color = color;
		if (pattern) query.pattern = pattern;
		if (material) query.material = material;
		if (gender) query.gender = gender;
		if (price) query.price = price;
		if (shipping) query.shipping = shipping;
		if (rating) query.rating = rating;
		if (sort) query.sort = sort;
		if (page) query.page = page;
		router.push({
			pathname: path,
			query: query,
		});
	};

	const searchHandler = (search) => {
		if (search == "") {
			filter({search: {}});
		} else {
			filter({search});
		}
	};

	const categoryHandler = (category) => {
		filter({category});
	};

	const brandHandler = (brand) => {
		filter({brand});
	};

	const styleHandler = (style) => {
		filter({style});
	};

	const sizeHandler = (size) => {
		filter({size});
	};

	const colorHandler = (color) => {
		filter({color});
	};

	const patternHandler = (pattern) => {
		filter({pattern});
	};

	const materialHandler = (material) => {
		filter({material});
	};

	const genderHandler = (gender) => {
		if (gender == "Unisex") {
			filter({gender: {}});
		} else {
			filter({gender});
		}
	};

	const priceHandler = (price, type) => {
		let priceQuery = router.query.price?.split("_") || "";
		let min = priceQuery[0] || "";
		let max = priceQuery[1] || "";
		let newPrice = "";
		if (type == "min") {
			newPrice = `${price}_${max}`;
		} else {
			newPrice = `${min}_${price}`;
		}
		filter({price: newPrice});
	};

	const multiPriceHandler = (min, max) => {
		filter({price: `${min}_${max}`});
	}

	const shippingHandler = (shipping) => {
		filter({shipping});
	};

	const ratingHandler = (rating) => {
		filter({rating});
	};

	const sortHandler = (sort) => {
		if (sort == "") {
			filter({sort: {}});
		} else {
			filter({sort});
		}
	};

	const pageHandler = (e, page) => {
		filter({page});
	};

	//----------
	function checkChecked(queryName, value) {
		if (router.query[queryName]?.search(value) !== -1) {
			return true;
		}
		return false;
	}

	function replaceQuery(queryName, value) {
		const existedQuery = router.query[queryName];
		const valueCheck = existedQuery?.search(value);
		const _check = existedQuery?.search(`_${value}`);
		let result = "";
		if (existedQuery) {
			if (existedQuery == value) {
				result = {};
			} else {
				if (valueCheck !== -1) {
					if (_check !== -1) {
						result = existedQuery?.replace(`_${value}`, "");
					} else if (valueCheck == 0) {
						result = existedQuery?.replace(`${value}_`, "");
					} else {
						result = existedQuery?.replace(value, "");
					}
				} else {
					result = `${existedQuery}_${value}`;
				}
			}
		} else {
			result = value;
		}
		return {
			result,
			active: existedQuery && valueCheck !== -1 ? true : false,
		};
	}

	//---------------------------------
	const [scrollY, setScrollY] = useState(0);
	const [height, setHeight] = useState(0);
	const headerRef = useRef(null);
	const el = useRef(null);
	useEffect(() => {
		const handleScroll = () => {
			setScrollY(window.scrollY);
		};
		handleScroll();
		window.addEventListener("scroll", handleScroll);
		setHeight(headerRef.current?.offsetHeight + el.current?.offsetHeight);
		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, []);
	console.log(scrollY, height);


	return (
		 <div className={styles.browse}>
			 <div ref={headerRef}>
				 <Header searchHandler={searchHandler}/>
			 </div>
			 <div className={styles.browse__container}>
				 <div ref={el}>
					 <div className={styles.browse__path}>Home / Browse</div>
					 <div className={styles.browse__tags}>
						 {categories.map((c) => (
								<Link href="" key={c._id}>
									<a>{c.name}</a>
								</Link>
						 ))}
					 </div>
				 </div>
				 <div
						className={`${styles.browse__store} ${
							 scrollY >= height ? styles.fixed : ""
						}`}
				 >
					 <div
							className={`${styles.browse__store_filters} ${styles.scrollbar}`}
					 >
						 <button
								className={styles.browse__clearBtn}
								onClick={() => router.push("/browse")}
						 >
							 Clear All ({Object.keys(router.query).length})
						 </button>
						 <CategoryFilter
								categories={categories}
								subCategories={subCategories}
								categoryHandler={categoryHandler}
								replaceQuery={replaceQuery}
						 />
						 <SizesFilter sizes={sizes} sizeHandler={sizeHandler}/>
						 <ColorsFilter
								colors={colors}
								colorHandler={colorHandler}
								replaceQuery={replaceQuery}
						 />
						 <BrandsFilter
								brands={brands}
								brandHandler={brandHandler}
								replaceQuery={replaceQuery}
						 />
						 <StylesFilter
								data={stylesData}
								styleHandler={styleHandler}
								replaceQuery={replaceQuery}
						 />
						 <PatternsFilter
								patterns={patterns}
								patternHandler={patternHandler}
								replaceQuery={replaceQuery}
						 />
						 <MaterialsFilter
								materials={materials}
								materialHandler={materialHandler}
								replaceQuery={replaceQuery}
						 />
						 <GenderFilter
								genderHandler={genderHandler}
								replaceQuery={replaceQuery}
						 />
					 </div>
					 <div className={styles.browse__store_products_wrap}>
						 <HeadingFilters
								priceHandler={priceHandler}
								multiPriceHandler={multiPriceHandler}
								shippingHandler={shippingHandler}
								ratingHandler={ratingHandler}
								replaceQuery={replaceQuery}
								sortHandler={sortHandler}
						 />
						 <div className={styles.browse__store_products}>
							 {products.map((product) => (
									<ProductCart product={product} key={product._id}/>
							 ))}
						 </div>
						 <div className={styles.pagination}>
							 <Pagination
									count={paginationCount}
									defaultPage={Number(router.query.page) || 1}
									onChange={pageHandler}
									variant="outlined"
									color="primary"
							 />
						 </div>
					 </div>
				 </div>
			 </div>
		 </div>
	);
};

