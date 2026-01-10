import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

import axios from "axios";

export const GetWishlist = createAsyncThunk("booking/Getwishlist", async () => {
    const Response = await axios.get("http://localhost:3000/wishlist")

    console.log(Response.data);

    return Response.data

})

export const GetBookingData = createAsyncThunk("booking/GetBookingData", async () => {
    const Response = await axios.get("http://localhost:3000/userbooked")
    console.log(Response);

    return Response.data
})

const Initialstates = {
    wishlist: [],
    booked: []
}

const Bookingslice = createSlice({
    name: "booking",
    initialState: Initialstates,
    reducers: {

    }, extraReducers: (builder) => {
        builder.addCase(GetWishlist.fulfilled, (state, action) => {
            state.wishlist = action.payload
        })

        builder.addCase(GetBookingData.fulfilled, (state, action) => {
            state.booked = action.payload
        })
    }
})
export const { } = Bookingslice.actions;
export default Bookingslice.reducer;