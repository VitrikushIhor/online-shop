import {createSlice} from "@reduxjs/toolkit";

export const expandSlice = createSlice({
	name: "expand",
	initialState: {
		expandSidebar: true,
	},
	reducers: {
		toggleSidebar: (state) => {
			state.expandSidebar = !state.expandSidebar;
		}
	},
});

export const {toggleSidebar} = expandSlice.actions;

export default expandSlice.reducer;
