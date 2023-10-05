import styles from "./styles.module.scss";
import {useState} from "react";
import {Form, Formik} from "formik";
import {ShippingInput} from "../../../components/inputs/shippingInput";
import {countries} from "../../../data/countries";
import ShippingSelect from "../../../components/shippingSelect";
import {userService} from "../../../services/user/user-service";
import {FaIdCard} from "react-icons/fa6";
import {IoIosRemoveCircleOutline, IoMdArrowDropupCircle} from "react-icons/io";
import {GiPhone} from "react-icons/gi";
import {FaMapMarkerAlt} from "react-icons/fa";
import {AiOutlinePlus} from "react-icons/ai";
import {toast} from "react-toastify";
import {shippingInitialValues, shippingValidate} from "../../../utils/validation";


export const Shipping = ({user, addresses, setAddresses}) => {
	const [shipping, setShipping] = useState(shippingInitialValues);
	const [visible, setVisible] = useState(user?.address.length === 0);
	const {
		firstName,
		lastName,
		phoneNumber,
		state,
		city,
		zipCode,
		address1,
		address2,
		country,
	} = shipping;

	const handleChange = (e) => {
		const {name, value} = e.target;
		setShipping({...shipping, [name]: value})
	}
	const saveShippingHandler = async () => {
		const res = await userService.saveAddress({address: shipping})
		setAddresses(res.addresses);
		toast.success("Address saved successfully")
	}

	const deleteAddressHandler = async (id) => {
		const res = await userService.deleteAddress({id});
		setAddresses(res.addresses);
	}

	const changeActiveHandler = async (id) => {
		const res = await userService.changeActiveAddress({addressId: id})
		setAddresses(res.addresses);
	}
	return (
		 <div className={styles.shipping}>
			 <div className={styles.addresses}>
				 {addresses.map((address) => (
						<div style={{position: "relative"}}>
							<div
								 className={styles.address__delete}
								 onClick={() => deleteAddressHandler(address._id)}
							>
								<IoIosRemoveCircleOutline/>
							</div>
							<div
								 className={`${styles.address} ${address.active && styles.active}`}
								 key={address._id}
								 onClick={() => changeActiveHandler(address._id)}
							>
								<div className={styles.address__side}>
									<img src={user.image} alt=""/>
								</div>
								<div className={styles.address__col}>
                <span>
                  <FaIdCard/>
	                {address.firstName.toUpperCase()}{" "}
	                {address.lastName.toUpperCase()}
                </span>
									<span>
                  <GiPhone/>
										{address.phoneNumber}
                </span>
								</div>
								<div className={styles.address__col}>
                <span>
                  <FaMapMarkerAlt/>
	                {address.address1}
                </span>
									<span>{address.address2}</span>
									<span>
                  {address.city},{address.state},{address.country}
                </span>
									<span>{address.zipCode}</span>
								</div>
								<span
									 className={styles.active__text}
									 style={{
										 display: `${!address.active && "none"}`,
									 }}
								>
                Active
              </span>
							</div>
						</div>
				 ))}
			 </div>
			 <button className={styles.hide_show} onClick={() => setVisible(!visible)}>
				 {visible ? (
						<span>
            <IoMdArrowDropupCircle style={{fontSize: "2rem", fill: "#222"}}/>
          </span>
				 ) : (
						<span>
            ADD NEW ADDRESS <AiOutlinePlus/>
          </span>
				 )}
			 </button>
			 {visible && <Formik
					enableReinitialize={true}
					initialValues={{
						firstName,
						lastName,
						phoneNumber,
						state,
						city,
						zipCode,
						address1,
						address2,
						country,
					}}
					validationSchema={shippingValidate}
					onSubmit={(values, {resetForm}) => {
						saveShippingHandler();
						resetForm();
						setVisible(false);

					}}
			 >
				 {(form) => (
						<Form>
							<ShippingSelect
								 name="country"
								 value={country}
								 placeholder="*Country"
								 handleChange={handleChange}
								 data={countries}
							/>
							<div className={styles.col}>
								<ShippingInput
									 name="firstName"
									 placeholder="*First Name"
									 onChange={handleChange}
								/>
								<ShippingInput
									 name="lastName"
									 placeholder="*Last Name"
									 onChange={handleChange}
								/>
							</div>
							<div className={styles.col}>
								<ShippingInput
									 name="state"
									 placeholder="*State/Province"
									 onChange={handleChange}
								/>
								<ShippingInput
									 name="city"
									 placeholder="*City"
									 onChange={handleChange}
								/>
							</div>
							<ShippingInput
								 name="phoneNumber"
								 placeholder="*Phone number"
								 onChange={handleChange}
							/>
							<ShippingInput
								 name="zipCode"
								 placeholder="*Post/Zip code"
								 onChange={handleChange}
							/>
							<ShippingInput
								 name="address1"
								 placeholder="Address 1"
								 onChange={handleChange}
							/>
							<ShippingInput
								 name="address2"
								 placeholder="Address 2"
								 onChange={handleChange}
							/>
							<button type="submit">Save Address</button>
						</Form>
				 )

				 }
			 </Formik>}
		 </div>
	);
};

