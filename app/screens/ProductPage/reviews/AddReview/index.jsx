import styles from "../styles.module.scss";
import {Rating} from "@mui/material";
import {Images} from "../../../../components/Images";
import {ClipLoader} from "react-spinners";
import {useState} from "react";
import {Select} from "../../../../components/Select"
import {toast} from "react-toastify";
import dataURItoBlob from "../../../../utils/dataURItoBlob";
import {uploadImages} from "../../../../services/uploadImages/uploadImages-service";
import axios from "axios";

let fits = ["Small", "True to size", "Large"];


export const AddReview = ({product, setReviews}) => {
	const [loading, setLoading] = useState(false);


	const [size, setSize] = useState("");
	const [style, setStyle] = useState("");
	const [fit, setFit] = useState("");
	const [review, setReview] = useState("");
	const [rating, setRating] = useState();
	const [images, setImages] = useState([]);
	let uploaded_images = [];

	const handleSubmit = async () => {
		setLoading(true);
		if (!size) {
			toast.error("Please select a size !")
			setLoading(false)
			return
		} else if (!style) {
			toast.error("Please select a style !")
			setLoading(false)
			return
		} else if (!fit) {
			toast.error("Please select a fit !")
			setLoading(false)
			return
		} else if (!review) {
			toast.error("Please add a review !")
			setLoading(false)
			return
		} else if (!rating) {
			toast.error("Please select a rating !")
			setLoading(false)
			return
		} else {
			if (images.length > 0) {
				let temp = images.map((img) => {
					return dataURItoBlob(img);
				});
				const path = "reviews images";
				let formData = new FormData();
				formData.append("path", path);
				temp.forEach((img) => {
					formData.append("file", img);
				});
				uploaded_images = await uploadImages(formData);
			}
			const {data} = await axios.put(`/api/product/${product._id}/review`, {
				size,
				style,
				fit,
				rating,
				review,
				images: uploaded_images,
			});
			setReviews(data.reviews);
			setStyle("");
			setSize("");
			setFit("");
			setImages([]);
			setRating(0);
			setReview("");
			setLoading(false);
		}
		setLoading(false);
	};

	return (
		 <div className={styles.reviews__add}>
			 <div className={styles.reviews__add_wrap}>
				 <div className={styles.flex} style={{gap: "10px"}}>
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
				 <Images images={images} setImages={setImages}/>
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
						style={{color: "#facf19", fontSize: "3rem"}}
				 />
				 <button
						className={`${styles.login_btn} ${loading ? styles.disabled : ""}`}
						onClick={() => handleSubmit()}
						disabled={loading}
				 >
					 Submit Review{" "}
					 {loading && <ClipLoader loading={loading} color="#fff"/>}
				 </button>
			 </div>
		 </div>
	);
};

