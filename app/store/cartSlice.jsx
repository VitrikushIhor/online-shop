import {createSlice} from "@reduxjs/toolkit";

const initialState = {
	cartItems: [],
}

export const cartSlice = createSlice({
	name: "cart",
	initialState,
	reducers: {
		addToCart: (state, {payload}) => {
			state.cartItems.push(payload)
		},
		updateCart: (state, {payload}) => {
			state.cartItems = payload
		},
		emptyCart: (state) => {
			state.cartItems = []
		}
	}
})


export const {
	addToCart
	,emptyCart
	,updateCart
}= cartSlice.actions

export default cartSlice.reducer
