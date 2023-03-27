import { Typography } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import React from "react";
import { SmallProduct } from "../interfaces/index";
import ProductInCart from "./ui/ProductInCart";

interface Props {
  cart: SmallProduct[];
}

const Cart = ({ cart }: Props) => {
  let total = 0;
  cart.forEach((product) => (total += product.price));
  return (
    <>
      {cart.map((product, i) => (
        <MenuItem key={i}>
          <ProductInCart product={product} index={i} />
        </MenuItem>
      ))}
      <Typography variant="h6" sx={{ marginLeft: "15px" }}>
        Total: ${total}
      </Typography>
    </>
  );
};

export default Cart;
