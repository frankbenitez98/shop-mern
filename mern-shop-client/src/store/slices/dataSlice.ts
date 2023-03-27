import { createSlice } from "@reduxjs/toolkit";
import { ProductResponse } from "../../interfaces/index";

// add interface about products
interface Initials {
  productList: ProductResponse[];
}

const initialState: Initials = {
  productList: [],
};

export const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    setProductList: (state, action) => {
      state.productList = action.payload;
    },
    setProductToList: (state, action) => {
      state.productList = state.productList.concat(action.payload);
    },
  },
});

export const { setProductList, setProductToList } = dataSlice.actions;
export default dataSlice.reducer;
