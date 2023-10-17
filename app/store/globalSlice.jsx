import {createSlice} from "@reduxjs/toolkit";

const initialState = {
	country:null
}


export const globalSlice = createSlice({
	name: "global",
	initialState,
	reducers: {
		setCountry: (state, {payload}) => {
			state.country = payload
		},
	}
})


export const { setCountry}= globalSlice.actions

export default globalSlice.reducer
