import { createSlice } from "@reduxjs/toolkit";
import { SmallProduct } from "../../interfaces/index";
import { useSelector } from "react-redux";
import { RootState } from "../store";

interface Initials {
  loading: boolean;
  search: string;
  cartProducts: SmallProduct[];
  productsToShow: SmallProduct[];
  searchedProducts: SmallProduct[];
  categorySelect: number;
}

const initialState: Initials = {
  loading: false,
  search: "",
  cartProducts: [],
  searchedProducts: [],
  categorySelect: 0,
  productsToShow: [],
};

export const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setSearch: (state, action) => {
      state.search = action.payload;
    },
    setCategorySelect: (state, action) => {
      state.categorySelect = action.payload;
    },
    setSearchedProducts: (state, action) => {
      state.searchedProducts = action.payload;
    },
    setProductsToShow: (state, action) => {
      state.productsToShow = action.payload;
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

export const {
  setLoading,
  deleteCartProduct,
  setProductToCart,
  setSearchedProducts,
  setSearch,
  setCategorySelect,
  setProductsToShow,
} = uiSlice.actions;
export default uiSlice.reducer;
