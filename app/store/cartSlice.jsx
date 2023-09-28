import {createSlice} from "@reduxjs/toolkit";

const initialState = {
	cartItems: [],
};
export const cartSlice = createSlice({
	name: "cart",
	initialState,
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
