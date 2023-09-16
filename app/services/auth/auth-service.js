import axios from "axios";


export const authService = {
	async register({name, email, password}) {
		const url = "/api/auth/signup";
		return await axios.post(url,{	name, email, password,});
	}
};
