import {
  Box,
  Checkbox,
  FormControlLabel,
  InputAdornment,
  TextField,
} from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import SearchIcon from "@mui/icons-material/Search";
import { useEffect } from "react";
import { setSearch, setSearchedProducts } from "../../store/slices/uiSlice";
import { useState } from "react";
import { SmallProduct } from "../../interfaces/index";

const Searcher = () => {
  const [checked, setChecked] = useState(false);
  const dispatch = useDispatch();
  const valueSearched = useSelector((state: RootState) => state.ui.search);
  const productsData = useSelector(
    (state: RootState) => state.data.productList
  );
  const productsFiltered = useSelector(
    (state: RootState) => state.ui.productsToShow
  );
  let products: SmallProduct[] = [];

  if (productsFiltered.length < 1) {
    products = productsData;
  } else {
    products = productsFiltered;
  }

  const handleOnSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearch(event.target.value));
  };
  const handleChecked = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };

  //funcion que devuelve un array con los products buscados

  const arrSearchedProducts = (search: string) => {
    let searched: any = [];

    if (search.length >= 1) {
      if (!checked) {
        searched = products.filter((prod) => {
          const text = prod.title.toLowerCase();
          const searchText = search.toLowerCase();
          return text.includes(searchText);
        });
      } else {
        if (!isNaN(+search)) {
          searched = products.filter((prod) => {
            const price = prod.price;
            const maxPrice = +search;
            return price < maxPrice;
          });
        }
      }
    } else {
      searched = products;
    }
    return searched;
  };

  //Validamos que si el estado valueSearched cambia entonces hacemos dispatch de los pokemons buscados.

  useEffect(() => {
    dispatch(setSearchedProducts(arrSearchedProducts(valueSearched)));
  }, [valueSearched]);

  return (
    <Box
      flexDirection="column"
      sx={{
        width: "100%",
        padding: "16px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "8px",
      }}
    >
      <TextField
        sx={{ width: { xs: "100%", md: "70%" } }}
        label="Products Searcher"
        variant="outlined"
        value={valueSearched}
        onChange={handleOnSearch}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />
      <FormControlLabel
        control={<Checkbox checked={checked} onChange={handleChecked} />}
        label="Search for max price"
      />
    </Box>
  );
};

export default Searcher;
