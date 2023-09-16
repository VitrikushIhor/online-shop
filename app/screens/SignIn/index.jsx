import styles from "./styles.module.scss";
import {useState} from "react";
import {initialValues} from "../../utils/authDefault";
import {useRouter} from "next/router";
import {signIn} from "next-auth/react";
import {DotLoaderSpiner} from "../../components/loaders/dotLoader";
import {Login} from "./Login";
import {Register} from "./Register";
import {authService} from "../../services/auth/auth-service";


export const SingInPage = ({providers ,callbackUrl,csrfToken}) => {

	const [loading, setLoading] = useState(false);
	const [user, setUser] = useState(initialValues)

	const {login_email,login_password,email,password,name,error}=user
	const { push } = useRouter();

	const handleChange=(e)=>{
		const {name,value}=e.target

		setUser({...user,[name]:value})
	}
	const signUpHandler = async () => {
		try {
			setLoading(true);
			const { data } = await authService.register({ name,email,password})
			setUser({ ...user, error: "", success: data.message });
			setLoading(false);
			setTimeout(async () => {
				let options = {
					redirect: false,
					email: email,
					password: password,
				};
				await signIn("credentials", options);
				await push("/");
			}, 2000);
		} catch (err) {
			setLoading(false);
			const errorMessage = err.response ? err.response.data.message : err.message;
			setUser({ ...user, success: "", error: errorMessage });
		}

	};

	const singInHandler =async ()=>{
		try {
			setLoading(true)
			let options = {
				redirect:false,
				email: login_email,
				password: login_password

			}
			const res = await signIn("credentials",options)
			setUser({...user,success: "",error: ""})
			setLoading(false)
			if (res?.error){
				setLoading(false)
				setUser({...user,login_error:res?.error})
			}else {
				await push(callbackUrl || "/");
			}
		}catch (e){

		}
	}

	return (
		 <section>
			 {loading && <DotLoaderSpiner loading={loading} />}
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

