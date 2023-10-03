import styles from "./styles.module.scss";
import {BiLeftArrowAlt} from "react-icons/bi";
import Link from "next/link";
import {Form, Formik} from "formik";
import LoginInput from "../../components/inputs/loginInput";
import {CircleButton} from "../../components/buttons/circleButton";
import {Socials} from "./Socials";
import {loginValidation} from "../../utils/validation";


export const Login = ({singInHandler, user, providers, handleChange}) => {

	const {login_email, login_password} = user

	return (
		 <div className={styles.login__container}>
			 <div className={styles.login__header}>
				 <div className={styles.back__svg}>
					 <BiLeftArrowAlt/>
				 </div>
				 <span>
							 We`d be happy to join us! <Link href={""}>Go to Store</Link>
						 </span>
			 </div>
			 <div className={styles.login__form}>
				 <h1>Sing In</h1>
				 <p>Get access to on of the best Eshopping service in the world.</p>
				 <Formik
						enableReinitialize={true}
						initialValues={{
							login_email,
							login_password
						}}
						validationSchema={loginValidation}
						onSubmit={() => {
							singInHandler()
						}}
				 >
					 {
						 (form) => (
								<Form>
									<LoginInput
										 type={"text"}
										 name={"login_email"}
										 icon={"email"}
										 placeholder="Email Address"
										 onChange={handleChange}
									/>
									<LoginInput
										 type={"password"}
										 name={"login_password"}
										 icon={"password"}
										 placeholder="Enter password"
										 onChange={handleChange}
									/>
									<CircleButton type={"submit"} text={"Sing In"}/>
									<div className={styles.forgot}>
										<Link href={"/auth/forgot"}>Forgot Password ?</Link>
									</div>
								</Form>
						 )
					 }
				 </Formik>
				 <Socials providers={providers}/>
			 </div>
		 </div>
	);
};

