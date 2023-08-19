import '../styles/globals.scss'
import store from "../store"
import {persistStore} from "redux-persist";
import {Provider} from "react-redux";
import {PersistGate} from "redux-persist/integration/react";

let persistor = persistStore(store)

function MyApp({Component, pageProps}) {
	return (
		 <Provider store={store}>
			 <PersistGate loading={null} persistor={persistor}>
				 <Component {...pageProps} />
			 </PersistGate>
		 </Provider>
	)
}

export default MyApp
