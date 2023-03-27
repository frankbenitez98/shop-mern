import { Grid } from "@mui/material";
import React from "react";
import ProductCard from "./ProductCard";
import useGetProducts from "../hooks/useGetProducts";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
//cambiar a la api creada en express

const ProductList = () => {
  useGetProducts();
  const productList = useSelector((state: RootState) => state.data.productList);
  const loading = useSelector((state: RootState) => state.ui.loading);

  return (
    <>
      {loading ? (
        <div>cargando...</div>
      ) : (
        productList.map((product, i) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={i}>
            <ProductCard product={product} key={i} />
          </Grid>
        ))
      )}
    </>
  );
};

export default ProductList;
