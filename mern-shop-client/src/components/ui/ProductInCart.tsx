import * as React from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import { Card, CardHeader, IconButton } from "@mui/material";
import CardContent from "@mui/material/CardContent";

import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { ProductResponse } from "../../interfaces";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch } from "react-redux";
import { deleteCartProduct } from "../../store/slices/uiSlice";

interface Props {
  product: ProductResponse;
  index: number;
}

const ProductInCart = ({ product, index }: Props) => {
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(deleteCartProduct(index));
  };

  return (
    <Card
      sx={{ display: "flex", width: "350px", justifyContent: "space-between" }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "start",
          width: "200px",
        }}
      >
        <CardContent sx={{ flex: "1 1 auto" }}>
          <Typography variant="caption" align="left">
            {product.title}
          </Typography>
          <Typography
            variant="subtitle1"
            color="text.secondary"
            component="div"
          >
            {`$ ${product.price}`}
          </Typography>
        </CardContent>
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CardMedia
          component="img"
          sx={{
            width: 70,
            height: 70,
            borderRadius: "10px",
          }}
          image={product.image}
          alt={product.title}
        />
      </Box>
      <IconButton onClick={handleDelete}>
        <CloseIcon />
      </IconButton>
    </Card>
  );
};

export default ProductInCart;
