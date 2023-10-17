import styles from "./styles.module.scss";
import {signIn} from "next-auth/react";


export const Socials = ({providers}) => {
	return (
		 <div className={styles.login__socials}>
			 <span className={styles.or}>Or continue with</span>
			 <div className={styles.login__socials_wrap}>
				 {providers.map((provider) => {
					 if (provider.name === "Credentials") {
						 return;
					 }
					 return (
							<div key={provider.name}>
								<button
									 className={styles.social__btn}
									 onClick={() => signIn(provider.id)}
								>
									<img src={`../../icons/${provider.name}.png`} alt="" />
									Sign in with {provider.name}
								</button>
							</div>
					 );
				 })}
			 </div>
		 </div>
	);
};

