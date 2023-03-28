import { Grid } from "@mui/material";
import ProductList from "../components/ProductList";
import NavBar from "../components/ui/NavBar";
import Searcher from "../components/ui/Searcher";

const Home = () => {
  return (
    <>
      <NavBar />
      <Grid container spacing={2} sx={{ padding: "24px", marginTop: "15px" }}>
        <Searcher />
        <ProductList />
      </Grid>
    </>
  );
};

export default Home;
