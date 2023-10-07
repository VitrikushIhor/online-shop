import styles from "./styles.module.scss";
import {Form, Formik} from "formik";
import {AdminInput} from "../../../../components/admin/AdminInput";
import {useState} from "react";
import {validateCategories} from "../../../../utils/validation";
import {toast} from "react-toastify";
import {CategoriesService} from "../../../../services/categories/categories-service";


export const CreateCategories = ({setCategories}) => {
	const [name, setName] = useState("")

	const submitHandler = async () => {
		try {
			const {data} = await CategoriesService.createCategory({name});
			setCategories(data.categories);
			setName("");
			toast.success(data.message);
		} catch (error) {
			toast.error(error.response.data.message);
		}
	};


	return (
		 <Formik
				enableReinitialize
				initialValues={{name}}
				validationSchema={validateCategories}
				onSubmit={() => {
					submitHandler();
				}}
		 >
			 {(formik) => (
					<Form>
						<div className={styles.header}>Create a Category</div>
						<AdminInput
							 type="text"
							 label="Name"
							 name="name"
							 placholder="Category name"
							 onChange={(e) => setName(e.target.value)}
						/>
						<div className={styles.btnWrap}>
							<button type="submit" className={`${styles.btn} `}>
								<span>Add Category</span>
							</button>
						</div>
					</Form>
			 )}
		 </Formik>
	);
};

