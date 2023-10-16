import {ProfileLayout} from "../../app/components/layouts/profileLayout";
import {Form, Formik} from "formik";
import LoginInput from "../../app/components/inputs/loginInput";
import {useState} from "react";
import {validateSecurity} from "../../app/utils/validation";
import axios from "axios";
import {toast} from "react-toastify";
import {CircleButton} from "../../app/components/buttons/circleButton";
import {Header} from "../../app/components/header";
import Meta from "../../app/components/meta";
import {Footer} from "../../app/components/footer";
import {getSession} from "next-auth/react";

const Security = ({user, tab}) => {

	const [current_password, setCurrent_password] = useState("");
	const [password, setPassword] = useState("");
	const [conf_password, setConf_password] = useState("");

	const changePasswordHanlder = async () => {
		try {
			const {data} = await axios.put("/api/user/change-password", {
				current_password,
				password,
			});
			toast.success(data.message);
			setCurrent_password("");
			setPassword("");
			setConf_password("");
		} catch (error) {
			toast.error(error.response.data.message);
		}
	};

	return (
		 <Meta
				title="Payment Methods"
				description="Payment Methods Page"
		 >
			 <Header/>
			 <ProfileLayout session={user?.user} tab={tab}>
				 <Formik
						enableReinitialize
						initialValues={{
							current_password,
							password,
							conf_password,
						}}
						validationSchema={validateSecurity}
						onSubmit={() => {
							changePasswordHanlder();
						}}
				 >
					 {(form) => (
							<Form>
								<LoginInput
									 type="password"
									 name="current_password"
									 icon="password"
									 placeholder="Current Password"
									 onChange={(e) => setCurrent_password(e.target.value)}
								/>
								<LoginInput
									 type="password"
									 name="password"
									 icon="password"
									 placeholder="New Password"
									 onChange={(e) => setPassword(e.target.value)}
								/>
								<LoginInput
									 type="password"
									 name="conf_password"
									 icon="password"
									 placeholder="Confirm Password"
									 onChange={(e) => setConf_password(e.target.value)}
								/>
								<CircleButton type="submit" text="Change"/>
							</Form>
					 )}
				 </Formik>
			 </ProfileLayout>
			 <Footer/>
		 </Meta>
	);
};

export default Security;

export async function getServerSideProps(ctx) {
	const {query, req} = ctx;
	const session = await getSession({req});
	const tab = query.tab || 0;
	return {
		props: {user: session, tab},
	};
}
