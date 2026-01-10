import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";



export const GetApiHotel = createAsyncThunk("product/GetApiHotel", async () => {
    const response = await axios.get("http://localhost:3000/hotel")
    sessionStorage.setItem("hotels", JSON.stringify(response.data))
    return response.data



})

const Initial = {
    Allproducts: [],
    products: [],
    FilterDetails: {
        city: "",
        length: 0
    },
    loading: false,
    error: null
}

const ProductSlice = createSlice({
    name: "product",
    initialState: Initial,
    reducers: {
        SearchFilter: (state, action) => {
            const Data = action.payload
            console.log(Data);

            if (Data) {
                state.products = state.Allproducts.filter((data) => {
                    return data?.location.city?.toLowerCase().includes(Data.toLowerCase()) || data.location.city.toLowerCase().includes(Data.toLowerCase())

                })

                state.FilterDetails.length = state.products.length
                state.FilterDetails.city = Data
            } else {
                state.products = state.Allproducts
                state.FilterDetails.length = state.Allproducts.length
                state.FilterDetails.city = "kerala"

            }
            state.FilterDetails.length = state.products.length;
        },
        Sortingfunc: (state, action) => {
            const Data = action.payload
            console.log(Data);

            if (Data) {

                if (Data === "lowhigh") {
                    state.products = [...state.products].sort((a, b) => a.price - b.price)
                } else if (Data === "highlow") {
                    state.products = [...state.products].sort((a, b) => b.price - a.price)
                } else if (Data === "toprate") {
                    state.products = [...state.products].sort((a, b) => a.rating - b.rating)
                } else if (Data == "lowrate") {
                    state.products = [...state.products].sort((a, b) => b.rating - a.rating)
                } else {
                    state.products = state.Allproducts
                }

            }
        },
        FuncAddallproduct: (state, action) => {
            const Data = action.payload
            state.products = Data
            state.Allproducts = Data
        }

    }
})

export const { SearchFilter, Sortingfunc, FuncAddallproduct } = ProductSlice.actions;
export default ProductSlice.reducer;