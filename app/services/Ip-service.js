import axios from "axios";


export const IPService = {
		async getCountryFromIP() {
			const url = "https://api.ipregistry.co/?key=d46oao4p1nsuv22l";
			return await axios.get(url);
	}
};
