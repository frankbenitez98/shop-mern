import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useAuthStore } from "../../hooks/useAuthStore";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store/store";
import ProductInCart from "./ProductInCart";
import Button from "@mui/material/Button";
import Cart from "../Cart";
import { useNavigate } from "react-router-dom";
import {
  setCategorySelect,
  setProductsToShow,
  setSearchedProducts,
} from "../../store/slices/uiSlice";
import { useEffect } from "react";

const categories = [
  "all",
  "clothes",
  "electronics",
  "furniture",
  "shoes",
  "others",
];

export default function NavBar() {
  //ui states
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [cartAnchorEl, setCartAnchorEl] = React.useState<null | HTMLElement>(
    null
  );
  const navigate = useNavigate();

  const cart = useSelector((state: RootState) => state.ui.cartProducts);
  const categorySelect = useSelector(
    (state: RootState) => state.ui.categorySelect
  );
  const products = useSelector((state: RootState) => state.data.productList);

  const dispatch = useDispatch();

  const { startLogout, user } = useAuthStore();

  const isCartMenuOpen = Boolean(cartAnchorEl);
  const isMenuOpen = Boolean(anchorEl);

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleCartMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setCartAnchorEl(event.currentTarget);
  };
  const handleCartMenuClose = () => {
    setCartAnchorEl(null);
  };
  const handleOnLogout = () => {
    startLogout();
  };

  const handleCategory = (cat: number) => {
    dispatch(setCategorySelect(cat));
  };

  useEffect(() => {
    const filter = products.filter((prod) => prod.category === categorySelect);
    console.log(filter);
    dispatch(setProductsToShow(filter));
  }, [categorySelect]);

  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
      sx={{ marginTop: "48px" }}
    >
      <MenuItem>Profile</MenuItem>
      <MenuItem>My account</MenuItem>
      {user?.isAdmin && (
        <MenuItem onClick={() => navigate("/dashboard")}>Dashboard</MenuItem>
      )}
      <MenuItem onClick={handleOnLogout}>Logout</MenuItem>
    </Menu>
  );

  const renderCart = (
    <Menu
      anchorEl={cartAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isCartMenuOpen}
      onClose={handleCartMenuClose}
      sx={{ marginTop: "48px", left: "0px", width: "360px" }}
    >
      <Cart cart={cart} />
      <MenuItem>
        <Button variant="contained" fullWidth>
          Checkout
        </Button>
      </MenuItem>
    </Menu>
  );
  const renderCategories = (
    <Box
      sx={{
        display: { xs: "none", md: "flex" },
        flexGrow: 1,
        marginLeft: "30px",
      }}
      flexDirection="row"
    >
      {categories.map((cat, i) => (
        <MenuItem
          sx={{
            borderRadius: "7px",
          }}
          key={i}
          divider={i === categorySelect}
          onClick={() => handleCategory(i)}
        >
          <Typography variant="h6">{cat}</Typography>
        </MenuItem>
      ))}
    </Box>
  );

  return (
    <Box sx={{ flexGrow: 1, marginBottom: "50px" }}>
      <AppBar position="fixed">
        <Toolbar>
          <Typography
            variant="h4"
            noWrap
            component="div"
            sx={{ display: { xs: "none", sm: "block", cursor: "pointer" } }}
            onClick={() => navigate("/")}
          >
            React Shop
          </Typography>
          {renderCategories}
          <Box>
            <IconButton
              size="large"
              color="inherit"
              onClick={handleCartMenuOpen}
            >
              <Badge badgeContent={cart.length} color="error">
                <ShoppingCartIcon />
              </Badge>
            </IconButton>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <Typography variant="h5" sx={{ marginRight: "10px" }}>
                {user?.name}
              </Typography>
              <AccountCircle />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMenu}
      {renderCart}
    </Box>
  );
}
