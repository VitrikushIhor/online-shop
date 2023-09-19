import styles from "../Forgot/styles.module.scss";
import {useState} from "react";
import {signIn} from "next-auth/react";
import {authService} from "../../services/auth/auth-service";
import {DotLoaderSpiner} from "../../components/loaders/dotLoader";
import {BiLeftArrowAlt} from "react-icons/bi";
import Link from "next/link";
import {Form, Formik} from "formik";
import {passwordValidation} from "../../utils/authDefault";
import LoginInput from "../../components/inputs/loginInput";
import {CircleButton} from "../../components/buttons/circleButton";
import {useRouter} from "next/router";


export const ResetPage = ({userId}) => {
	const [password, setPassword] = useState("");
	const [confirm_password, setConfirm_password] = useState("");
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);
	const { push } = useRouter();

	const resetHandler = async () => {
		try {
			setLoading(true);
			const { data } = await authService.resetPassword({password,userId})
			let options = {
				redirect: false,
				email: data.email,
				password: password,
			};
			await signIn("credentials", options);
			await push("/");
		} catch (error) {
			setLoading(false);
			setError(error.response.data.message);
		}
	};

	return (
			 <section className={styles.forgot}>
			 {loading && <DotLoaderSpiner loading={loading} />}
				 <div>
					 <div className={styles.forgot__header}>
						 <div className={styles.back__svg}>
							 <BiLeftArrowAlt />
						 </div>
						 <span>
              Reset your password ? <Link href="/">Login instead</Link>
            </span>
					 </div>
					 <Formik
						  enableReinitialize
						  initialValues={{
							  password,
							  confirm_password,
						  }}
						  validationSchema={passwordValidation}
						  onSubmit={() => {
							  resetHandler();
						  }}
					 >
						 {(form) => (
							  <Form>
								  <LoginInput
										 type="password"
										 name="password"
										 icon="password"
										 placeholder="Password"
										 onChange={(e) => setPassword(e.target.value)}
								  />
								  <LoginInput
										 type="password"
										 name="confirm_password"
										 icon="password"
										 placeholder="Confirm Password"
										 onChange={(e) => setConfirm_password(e.target.value)}
								  />

								  <CircleButton type="submit" text="Submit" />
								  <div style={{ marginTop: "10px" }}>
									  {error && <span className={styles.error}>{error}</span>}
								  </div>
							  </Form>
						 )}
					 </Formik>
				 </div>
			 </section>
	);
};
