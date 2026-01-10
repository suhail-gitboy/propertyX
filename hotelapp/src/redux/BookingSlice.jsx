import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

import axios from "axios";


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
        addWishlist: (state, action) => {
            state.wishlist = action.payload
        }

    }
})
export const { addWishlist } = Bookingslice.actions;
export default Bookingslice.reducer;