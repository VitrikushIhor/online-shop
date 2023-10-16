import {Header} from "../../header";
import {Footer} from "../../footer";

export const Layout = ({children}) => {
	return (
		 <main>
			 <Header/>
			 {children}
			 <Footer/>
		 </main>
	);
};

