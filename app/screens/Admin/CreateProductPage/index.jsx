import styles from "./styles.module.scss";
import {initialStateCreateProduct, validateCreateProduct} from "../../../utils/validation";
import {useEffect, useState} from "react";
import axios from "axios";
import {Form, Formik} from "formik";
import ShippingSelect from "../../../components/shippingSelect";
import {AdminInput} from "../../../components/admin/AdminInput";
import {MultipleSelect} from "../../../components/MultipleSelect";
import {Colors} from "../../../components/admin/Colors";
import {AdminImages} from "../../../components/admin/adminImages";
import {Style} from "../../../components/admin/Style";
import {Sizes} from "../../../components/admin/Sizes";
import {Details} from "../../../components/admin/Details";
import {Questions} from "../../../components/admin/Questions";
import dataURItoBlob from "../../../utils/dataURItoBlob";
import {uploadImages} from "../../../services/uploadImages/uploadImages-service";
import {toast} from "react-toastify";


export const CreateProductPage = ({categories, parents}) => {
	const [product, setProduct] = useState(initialStateCreateProduct);
	const [subs, setSubs] = useState([]);
	const [colorImage, setColorImage] = useState("");
	const [images, setImages] = useState([]);
	const [description_images, setDescription_images] = useState("");
	const [loading, setLoading] = useState(false);
	let uploaded_images = [];
	let style_img = "";

	useEffect(() => {
		const getParentData = async () => {
			const {data} = await axios.get(`/api/product/${product.parent}`)
			if (data) {
				setProduct({
					...product,
					name: data.name,
					description: data.description,
					brand: data.brand,
					category: data.category,
					subCategories: data.subCategories,
					questions: [],
					details: [],
				});
			}
		}
		getParentData();
	}, [product.parent]);

	useEffect(() => {
		async function getSubs() {
			const {data} = await axios.get("/api/admin/subCategory", {
				params: {
					category: product.category,
				},
			});
			setSubs(data);
		}

		getSubs();
	}, [product.category]);

	const createProductHandler = async () => {
		setLoading(true);
		if (images) {
			let temp = images.map((img) => {
				return dataURItoBlob(img);
			});
			const path = "product images";
			let formData = new FormData();
			formData.append("path", path);
			temp.forEach((image) => {
				formData.append("file", image);
			});
			uploaded_images = await uploadImages(formData);
		}
		if (product.color.image) {
			let temp = dataURItoBlob(product.color.image);
			let path = "product style images";
			let formData = new FormData();
			formData.append("path", path);
			formData.append("file", temp);
			let cloudinary_style_img = await uploadImages(formData);
			style_img = cloudinary_style_img[0].url;
		}
		try {
			const {data} = await axios.post("/api/admin/product", {
				...product,
				images: uploaded_images,
				color: {
					image: style_img,
					color: product.color.color,
				},
			});
			setLoading(false);
			toast.success(data.message);
		} catch (error) {
			setLoading(false);
			toast.error(error.response.data.message);
		}
	};

	const handleChange = (e) => {
		const {value, name} = e.target;
		setProduct({...product, [name]: value});
	};

	return (
		 <>
			 <div className={styles.header}>Create Product</div>
			 <Formik
					enableReinitialize
					initialValues={{
						name: product.name,
						brand: product.brand,
						description: product.description,
						category: product.category,
						subCategories: product.subCategories,
						parent: product.parent,
						sku: product.sku,
						discount: product.discount,
						color: product.color.color,
						imageInputFile: "",
						styleInout: "",
					}}
					validationSchema={validateCreateProduct}
					onSubmit={() => {
						createProductHandler();
					}}
			 >
				 {(formik) => (
						<Form>
							<AdminImages
								 name="imageInputFile"
								 header="Product Carousel Images"
								 text="Add images"
								 images={images}
								 setImages={setImages}
								 setColorImage={setColorImage}
							/>
							<div className={styles.flex}>
								{product.color.image && (
									 <img
											src={product.color.image}
											className={styles.image_span}
											alt=""
									 />
								)}
								{product.color.color && (
									 <span
											className={styles.color_span}
											style={{background: `${product.color.color}`}}
									 ></span>
								)}
							</div>
							<Colors
								 name="color"
								 product={product}
								 setProduct={setProduct}
								 colorImage={colorImage}
							/>
							<Style
								 name="styleInput"
								 product={product}
								 setProduct={setProduct}
								 colorImage={colorImage}
							/>
							<ShippingSelect
								 name="parent"
								 value={product.parent}
								 placeholder="Parent product"
								 data={parents}
								 header="Add to an existing product"
								 handleChange={handleChange}
							/>
							<ShippingSelect
								 name="category"
								 value={product.category}
								 placeholder="Category"
								 data={categories}
								 header="Select a Category"
								 handleChange={handleChange}
								 disabled={product.parent}
							/>
							{product.category && (
								 <MultipleSelect
										value={product.subCategories}
										data={subs}
										header="Select SubCategories"
										name="subCategories"
										disabled={product.parent}
										handleChange={handleChange}
								 />
							)}
							<div className={styles.header}>Basic Infos</div>
							<AdminInput
								 type="text"
								 label="Name"
								 name="name"
								 placholder="Product name"
								 onChange={handleChange}
							/>
							<AdminInput
								 type="text"
								 label="Description"
								 name="description"
								 placholder="Product description"
								 onChange={handleChange}
							/>
							<AdminInput
								 type="text"
								 label="Brand"
								 name="brand"
								 placholder="Product brand"
								 onChange={handleChange}
							/>
							<AdminInput
								 type="text"
								 label="Sku"
								 name="sku"
								 placholder="Product sku/ number"
								 onChange={handleChange}
							/>
							<AdminInput
								 type="text"
								 label="Discount"
								 name="discount"
								 placholder="Product discount"
								 onChange={handleChange}
							/>
							<Sizes
								 sizes={product.sizes}
								 product={product}
								 setProduct={setProduct}
							/>
							<Details
								 details={product.details}
								 product={product}
								 setProduct={setProduct}
							/>
							<Questions
								 questions={product.questions}
								 product={product}
								 setProduct={setProduct}
							/>
							<button
								 className={`${styles.submit_btn}`}
								 type="submit"
							>
								Create Product
							</button>
						</Form>
				 )}
			 </Formik>
		 </>
	);
};

