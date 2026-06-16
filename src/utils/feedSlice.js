import { createSlice } from "@reduxjs/toolkit";

const feedSlice = createSlice({
  name: "feed",
  initialState: null,
  reducers: {
    addFeed: (state, action) => action.payload,
    removeUser: (state, action) => null,
  },
});

export const { addFeed, removeUser } = feedSlice.actions;
export default feedSlice.reducer;
