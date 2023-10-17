import {createSlice} from "@reduxjs/toolkit";

export const cartSlice = createSlice({
	name: "cart",
	initialState:{
		cartItems: [],
	},
	reducers: {
		addToCart(state, { payload }) {
			state.cartItems.push(payload);
		},
		updateCart(state, { payload }) {
			state.cartItems = payload;
		},
		emptyCart(state, action) {
			state.cartItems = [];
		},
	},
});

export const { addToCart, updateCart, emptyCart } = cartSlice.actions;

export default cartSlice.reducer;
