import styles from "../styles.module.scss";
import {TableHeader} from "./TableHeader";
import {Review} from "./Review";
import {useState} from "react";
import usePagination from "../../../../hooks/usePagination";
import {Pagination} from "@mui/material";

export const Table = ({allSizes,reviews,colors}) => {
	const [page, setPage] = useState(1);
	const PER_PAGE = 3;
	const count = Math.ceil(reviews.length / PER_PAGE);
	const _DATA = usePagination(reviews, PER_PAGE);
	const handleChange = (e, p) => {
		setPage(p);
		_DATA.jump(p);
	};
	return (
		 <div className={styles.container}>
			 <TableHeader
				  reviews={reviews}
				  allSizes={[{ size: "All" }, ...allSizes]}
				  colors={[{ color: "", image: "" }, ...colors]}
			 />
			 <div className={styles.table__data}>
				 {_DATA.currentData().map((review, i) => (
					  <Review review={review} key={i} />
				 ))}
			 </div>
			 <div className={styles.pagination}>
				 <Pagination
					  count={count}
					  page={page}
					  variant="round"
					  shape="rounded"
					  onChange={handleChange}
				 />
			 </div>
		 </div>
	);
};

