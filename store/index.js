import {combineReducers, configureStore} from "@reduxjs/toolkit";
import {persistReducer} from "redux-persist";

import thunk from "redux-thunk"
import storage from "redux-persist/lib/storage";
import cart from "./cartSlice"

const reducers = combineReducers({cart})

const config = {
	key: "root",
	storage
}

const reducer = persistReducer(config, reducers)

const store = configureStore({
	reducer: reducer,
	devTools: process.env.NODE_ENV !== "production",
	middleware: [thunk]
})

export default store
