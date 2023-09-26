import styles from "../styles.module.scss";
import {Rating} from "@mui/material";
import {Images} from "../../../../components/Images";
import {ClipLoader} from "react-spinners";
import {useState} from "react";
import {useDispatch} from "react-redux";
import {Select} from "../../../../components/Select"

let fits = ["Small", "True to size", "Large"];


export const AddReview = ({ product,setReviews}) => {
	let uploaded_images = [];
	const dispatch = useDispatch();

	const [size, setSize] = useState("");
	const [style, setStyle] = useState("");
	const [fit, setFit] = useState("");
	const [review, setReview] = useState("");
	const [rating, setRating] = useState();
	const [images, setImages] = useState([])
	const [loading, setLoading] = useState(false);


	// useEffect(() => {
	// 	dispatch(hideDialog());
	// }, []);



	return (
		 <div className={styles.reviews__add}>
			 {/*<DialogModal />*/}
			 <div className={styles.reviews__add_wrap}>
				 <div className={styles.flex} style={{ gap: "10px" }}>
					 <Select
							property={size}
							text="Size"
							data={product.allSizes.filter((x) => x.size !== size)}
							handleChange={setSize}
					 />
					 <Select
							property={style}
							text="Style"
							data={product.colors.filter((x) => x !== style)}
							handleChange={setStyle}
					 />
					 <Select
							property={fit}
							text="How does it fit"
							data={fits.filter((x) => x !== fit)}
							handleChange={setFit}
					 />
				 </div>
				 <Images images={images} setImages={setImages} />
				 <textarea
						name="review"
						value={review}
						onChange={(e) => setReview(e.target.value)}
						placeholder="Write your review here"
				 />
				 <Rating
						name="half-rating-read"
						defaultValue={0}
						value={rating}
						onChange={(e) => setRating(e.target.value)}
						precision={0.5}
						style={{ color: "#facf19", fontSize: "3rem" }}
				 />
				 <button
						className={`${styles.login_btn} ${loading ? styles.disabled : ""}`}
						onClick={() => handleSubmit()}
						disabled={loading}
				 >
					 Submit Review{" "}
					 {loading && <ClipLoader loading={loading} color="#fff" />}
				 </button>
			 </div>
		 </div>
	);
};

