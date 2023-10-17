import styles from "./styles.module.scss";
import {useState} from "react";
import {Form, Formik} from "formik";
import {AdminInput} from "../../../../components/admin/AdminInput";
import {validateSubCategories} from "../../../../utils/validation";
import {toast} from "react-toastify";
import ShippingSelect from "../../../../components/shippingSelect";
import {SubCategoriesService} from "../../../../services/SubCategories/SubCategories-service";


export const SubCategoriesCreate = ({categories, setSubCategories}) => {
	const [name, setName] = useState("");
	const [parent, setParent] = useState("");


	const submitHandler = async () => {
		try {
			const {data} = await SubCategoriesService.createSubCategory({name, parent})
			setSubCategories(data.subCategories);
			setName("");
			setParent("");
			toast.success(data.message);
		} catch (error) {
			toast.error(error.response.data.message);
		}
	};


	return (
		 <Formik
				enableReinitialize
				initialValues={{name, parent}}
				validationSchema={validateSubCategories}
				onSubmit={() => {
					submitHandler();
				}}
		 >
			 {(formik) => (
					<Form>
						<div className={styles.header}>Create a SubCategory</div>
						<AdminInput
							 type="text"
							 label="Name"
							 name="name"
							 placholder="Sub-Category name"
							 onChange={(e) => setName(e.target.value)}
						/>
						<ShippingSelect
							 name="parent"
							 value={parent}
							 data={categories}
							 placeholder="Select Category"
							 handleChange={(e) => setParent(e.target.value)}
						/>
						<div className={styles.btnWrap}>
							<button type="submit" className={`${styles.btn} `}>
								<span>Add SubCategory</span>
							</button>
						</div>
					</Form>
			 )}
		 </Formik>
	);
};

