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

export const shippingInitialValues = {
	firstName: "",
	lastName: "",
	phoneNumber: "",
	state: "",
	city: "",
	zipCode: "",
	address1: "",
	address2: "",
	country: "",
};


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

export const shippingValidate = Yup.object({
	firstName: Yup.string()
		 .required("First name is required.")
		 .min(3, "First name must be atleast 3 characters long.")
		 .max(20, "First name must be less than 20 characters long."),
	lastName: Yup.string()
		 .required("Last name is required.")
		 .min(3, "Last name must be atleast 3 characters long.")
		 .max(20, "Last name must be less than 20 characters long."),
	phoneNumber: Yup.string()
		 .required("Phone number is required.")
		 .min(3, "Phone number must be atleast 3 characters long.")
		 .max(30, "Phone number must be less than 20 characters long."),
	state: Yup.string()
		 .required("State name is required.")
		 .min(2, "State name should contain 2-60 characters..")
		 .max(60, "State name should contain 2-60 characters."),
	city: Yup.string()
		 .required("City name is required.")
		 .min(2, "City name should contain 2-60 characters.")
		 .max(60, "City name should contain 2-60 characters."),
	zipCode: Yup.string()
		 .required("ZipCode/Postal is required.")
		 .min(2, "ZipCode/Postal should contain 2-30 characters..")
		 .max(30, "ZipCode/Postal should contain 2-30 characters."),
	address1: Yup.string()
		 .required("Address Line 1 is required.")
		 .min(5, "Address Line 1 should contain 5-100 characters.")
		 .max(100, "Address Line 1 should contain 5-100 characters."),
	address2: Yup.string()
		 .min(5, "Address Line 2 should contain 5-100 characters.")
		 .max(100, "Address Line 2 should contain 5-100 characters."),
	country: Yup.string().required("Country name is required."),
});


export const validateCoupon = Yup.object({
	coupon: Yup.string().required("Pleace enter a coupon first !"),
});


export const validateCategories = Yup.object({
	name: Yup.string()
		 .required("Category name is required.")
		 .min(2, "Category name must be bewteen 2 and 30 characters.")
		 .max(30, "Category name must be bewteen 2 and 30 characters."),
});

export const validateSubCategories = Yup.object({
	name: Yup.string()
		 .required("SubCategory name is required.")
		 .min(2, "SubCategory name must be bewteen 2 and 30 characters.")
		 .max(30, "SubCategory name must be bewteen 2 and 30 characters."),
	parent: Yup.string().required("Please choose a parent category."),
});
