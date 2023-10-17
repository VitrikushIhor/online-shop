import styles from "./styles.module.scss";
import {useState} from "react";
import {useRouter} from "next/router";
import {signIn} from "next-auth/react";
import {DotLoaderSpiner} from "../../components/loaders/dotLoader";
import {Login} from "./Login";
import {Register} from "./Register";
import {authService} from "../../services/auth/auth-service";
import {toast} from "react-toastify";
import {initialValues} from "../../utils/validation";


export const SingInPage = ({providers, callbackUrl, csrfToken}) => {

	const [loading, setLoading] = useState(false);
	const [user, setUser] = useState(initialValues)

	const {login_email, login_password, email, password, name} = user
	const {push} = useRouter();

	const handleChange = (e) => {
		const {name, value} = e.target

		setUser({...user, [name]: value})
	}
	const signUpHandler = async () => {
		try {
			setLoading(true);
			const {data} = await authService.register({name, email, password})
			toast.success(`${data.message}`);
			setLoading(false);
			setTimeout(async () => {
				let options = {
					redirect: false,
					email: email,
					password: password,
				};
				await signIn("credentials", options);
				await push("/");
			}, 1000);
		} catch (err) {
			setLoading(false);
			const errorMessage = err.response ? err.response.data.message : err.message;
			toast.error(`${errorMessage}`)
		}

	};

	const singInHandler = async () => {
		try {

			setLoading(true)

			let options = {
				redirect: false,
				email: login_email,
				password: login_password

			}
			const res = await signIn("credentials", options)

			setLoading(false)

			if (res?.error) {
				setLoading(false)
				toast.error(`${res?.error}`);
			} else {
				toast.success(`Login Success`);
				await push(callbackUrl || "/");
			}

		} catch (e) {

		}
	}

	return (
		 <section>
			 {loading && <DotLoaderSpiner loading={loading}/>}
			 <div className={styles.login}>
				 <Login
						singInHandler={singInHandler}
						user={user}
						providers={providers}
						handleChange={handleChange}
				 />
				 <Register
						user={user}
						handleChange={handleChange}
						signUpHandler={signUpHandler}
						csrfToken={csrfToken}/>
			 </div>
		 </section>
	);
};

