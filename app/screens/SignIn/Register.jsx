import styles from "./styles.module.scss";
import {Form, Formik} from "formik";
import {registerValidation} from "../../utils/authDefault";
import LoginInput from "../../components/inputs/loginInput";
import {CircleButton} from "../../components/buttons/circleButton";


export const Register = ({signUpHandler,user,handleChange,csrfToken}) => {
	const {
		confirm_password,email, password, name, error, success}=user
	return (
		 <div className={styles.login__container}>
			 <div className={styles.login__form}>
				 <h1>Sign up</h1>
				 <p>
					 Get access to one of the best Eshopping services in the world.
				 </p>
				 <Formik
						enableReinitialize
						initialValues={{
							name,
							email,
							password,
							confirm_password,
						}}
						validationSchema={registerValidation}
						onSubmit={() => {
							signUpHandler();
						}}
				 >
					 {(form) => (
							<Form method={"post"} action={"/api/auth/signin/email"}>
								<input
									 type="hidden"
									 name="csrfToken"
									 defaultValue={csrfToken}
								/>
								<LoginInput
									 type="text"
									 name="name"
									 icon="user"
									 placeholder="Full Name"
									 onChange={handleChange}
								/>
								<LoginInput
									 type="text"
									 name="email"
									 icon="email"
									 placeholder="Email Address"
									 onChange={handleChange}
								/>
								<LoginInput
									 type="password"
									 name="password"
									 icon="password"
									 placeholder="Password"
									 onChange={handleChange}
								/>
								<LoginInput
									 type="password"
									 name="confirm_password"
									 icon="password"
									 placeholder="Re-Type Password"
									 onChange={handleChange}
								/>
								<CircleButton type={"submit"} text={"Sing Up"}/>
							</Form>
					 )}
				 </Formik>
				 <div>
					 {success && <span className={styles.success}>{success}</span>}
				 </div>
				 <div>{error && <span className={styles.error}>{error}</span>}</div>
			 </div>
		 </div>
	);
};

