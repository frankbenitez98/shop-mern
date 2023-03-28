import { Grid } from "@mui/material";
import React from "react";
import ProductCard from "./ProductCard";
import useGetProducts from "../hooks/useGetProducts";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { useEffect } from "react";
import { SmallProduct } from "../interfaces/index";
import { useState } from "react";
//cambiar a la api creada en express

const ProductList = () => {
  useGetProducts();
  const loading = useSelector((state: RootState) => state.ui.loading);
  const productList = useSelector((state: RootState) => state.data.productList);
  const productsFiltered = useSelector(
    (state: RootState) => state.ui.productsToShow
  );
  const searchedList = useSelector(
    (state: RootState) => state.ui.searchedProducts
  );
  const valueSearched = useSelector((state: RootState) => state.ui.search);

  // const productsToShow =
  //   searchedList.length < 1 ||
  //   valueSearched === ""
  //     ? productList
  //     : searchedList;

  //const [ productsToShow, setProductToShow] = useState<any>();

  let productsToShow;

  if (productsFiltered.length > 0) {
    productsToShow = productsFiltered;
    if (searchedList.length > 0 && valueSearched.length > 1) {
      productsToShow = searchedList;
      console.log("render desde searchlist");
    }
  } else {
    if (searchedList.length > 0 && valueSearched.length > 1) {
      productsToShow = searchedList;
    } else {
      productsToShow = productList;
    }
  }

  return (
    <>
      {loading ? (
        <div>cargando...</div>
      ) : (
        productsToShow.map((product, i) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={i}>
            <ProductCard product={product} key={i} />
          </Grid>
        ))
      )}
    </>
  );
};

export default ProductList;
