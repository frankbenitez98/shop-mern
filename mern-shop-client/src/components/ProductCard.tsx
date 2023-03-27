import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Icon,
  IconButton,
} from "@mui/material";
import AddShoppingCart from "@mui/icons-material/AddShoppingCart";
import { ProductResponse } from "../interfaces/index";
import { useDispatch } from "react-redux";
import { setProductToCart } from "../store/slices/uiSlice";

interface Props {
  product: ProductResponse;
}

const ProductCard = ({ product }: Props) => {
  const dispatch = useDispatch();
  const handleAddToCart = () => {
    dispatch(setProductToCart(product));
  };
  return (
    <Card
      sx={{
        padding: "8px",
      }}
    >
      <CardHeader
        title={`$${product.price}`}
        subheader={product.title}
        action={
          <IconButton color="primary" onClick={handleAddToCart}>
            <AddShoppingCart />
          </IconButton>
        }
      />
      <CardContent sx={{ display: "grid", justifyContent: "center" }}>
        <CardMedia
          component="img"
          image={product.image}
          alt={product.title}
          height="200"
          //onClick={handleOnClick}
          sx={{
            cursor: "pointer",
            borderRadius: "15px",
          }}
        />
      </CardContent>
    </Card>
  );
};

export default ProductCard;
