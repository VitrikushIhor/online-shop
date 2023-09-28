import styles from "./styles.module.scss";
import Link from "next/link";
import {BiLeftArrowAlt} from "react-icons/bi";
import {Form, Formik} from "formik";
import LoginInput from "../../components/inputs/loginInput";
import {useState} from "react";
import {CircleButton} from "../../components/buttons/circleButton";
import {emailValidation} from "../../utils/authDefault";
import {authService} from "../../services/auth/auth-service";
import {DotLoaderSpiner} from "../../components/loaders/dotLoader";
import {toast} from "react-toastify";
import {useRouter} from "next/router";


export const ForgotPage = () => {

	const [email, setEmail] = useState("");
	const [loading, setLoading] = useState(false);
	const { push } = useRouter();

	const forgotHandler = async () => {
		try {
			setLoading(true);
			const { data } = await authService.forgotPassword({email})
			setLoading(false);
			setEmail("");
			toast.success(`${data.message}`)
			setTimeout(async () => {
				await push("/signin")
			}, 1000);
		} catch (error) {
			setLoading(false);
			toast.error(`${error.response.data.message}`);
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
              Forgot your password ? <Link href="/">Login instead</Link>
            </span>
				</div>
				<Formik
					 enableReinitialize={true}
					 initialValues={{
						 email,
					 }}
					 validationSchema={emailValidation}
					 onSubmit={() => {
						 forgotHandler();
					 }}
				>
					{(form) => (
						 <Form>
							 <LoginInput
									type="text"
									name="email"
									icon="email"
									placeholder="Email Address"
									onChange={(e) => setEmail(e.target.value)}
							 />

							 <CircleButton type="submit" text="Send link" />
						 </Form>
					)}
				</Formik>
			</div>
		 </section>
	);
};

