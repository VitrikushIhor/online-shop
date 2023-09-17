import * as Yup from "yup";

export const initialValues = {
	login_email: "",
	login_password: "",
	name: "",
	email: "",
	password: "",
	confirm_password: "",
	success: "",
	error: "",
	login_error: "",
}

export const loginValidation = Yup.object({
	login_email: Yup.string()
		 .required("Email address is required.")
		 .email("Please enter a valid email address."),
	login_password: Yup.string().required("Please enter a password"),
});

export const registerValidation = Yup.object({
	name: Yup.string()
		 .required("What's your name ?")
		 .min(2, "First name must be between 2 and 16 characters.")
		 .max(16, "First name must be between 2 and 16 characters.")
		 .matches(/^[aA-zZ]/, "Numbers and special characters are not allowed."),
	email: Yup.string()
		 .required(
				"You'll need this when you log in and if you ever need to reset your password."
		 )
		 .email("Enter a valid email address."),
	password: Yup.string()
		 .required(
				"Enter a combination of at least six numbers,letters and punctuation marks(such as ! and &)."
		 )
		 .min(6, "Password must be atleast 6 characters.")
		 .max(36, "Password can't be more than 36 characters"),
	confirm_password: Yup.string()
		 .required("Confirm your password.")
		 .oneOf([Yup.ref("password")], "Passwords must match."),
});

export const emailValidation = Yup.object({
	email: Yup.string()
		 .required(
				"You'll need this when you log in and if you ever need to reset your password."
		 )
		 .email("Enter a valid email address."),
});


export const passwordValidation = Yup.object({
	password: Yup.string()
		 .required("Please enter your new password.")
		 .min(6, "Password must be atleast 6 characters.")
		 .max(36, "Password can't be more than 36 characters"),
	confirm_password: Yup.string()
		 .required("Confirm your password.")
		 .oneOf([Yup.ref("password")], "Passwords must match."),
});
