import { Grid } from "@mui/material";
import ProductList from "../components/ProductList";
import NavBar from "../components/ui/NavBar";

const Home = () => {
  return (
    <>
      <NavBar />
      <Grid container spacing={2} sx={{ padding: "24px" }}>
        <Grid
          item
          xs={12}
          sx={{
            display: "flex",
            alignContent: "center",
            justifyContent: "center",
          }}
        ></Grid>
        <ProductList />
      </Grid>
    </>
  );
};

export default Home;
