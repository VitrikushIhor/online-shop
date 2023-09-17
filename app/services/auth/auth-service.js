import axios from "axios";


export const authService = {
	async register({name, email, password}) {
		const url = "/api/auth/signup";
		return await axios.post(url,{	name, email, password,});
	},
	async forgotPassword({ email}) {
		const url = "/api/auth/forgot";
		return await axios.post(url,{ email});
	},
	async resetPassword({ password,userId}) {
		const url = "/api/auth/reset";
		return await axios.put(url,{ password,userId});
	}
};
