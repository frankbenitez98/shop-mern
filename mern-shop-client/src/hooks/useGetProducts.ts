import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setProductList } from "../store/slices/dataSlice";
import shopApi from "../api/shopApi";
import { setLoading } from "../store/slices/uiSlice";

const useGetProducts = () => {
  const dispatch = useDispatch();

  async function fetchData() {
    dispatch(setLoading(true));
    const { data } = await shopApi.get("/shop/");
    dispatch(setLoading(false));
    dispatch(setProductList(data.data));
  }
  useEffect(() => {
    fetchData();
  }, []);
};

export default useGetProducts;
