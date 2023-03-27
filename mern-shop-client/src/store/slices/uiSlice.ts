import { createSlice } from "@reduxjs/toolkit";
import { SmallProduct } from "../../interfaces/index";

interface Initials {
  loading: boolean;
  cartProducts: SmallProduct[];
}

const initialState: Initials = {
  loading: false,
  cartProducts: [],
};

export const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },

    deleteCartProduct: (state, action) => {
      state.cartProducts = state.cartProducts.filter(
        (_, index) => index !== action.payload
      );
    },

    setProductToCart: (state, action) => {
      state.cartProducts = state.cartProducts.concat(action.payload);
    },
  },
});

export const { setLoading, deleteCartProduct, setProductToCart } =
  uiSlice.actions;
export default uiSlice.reducer;
