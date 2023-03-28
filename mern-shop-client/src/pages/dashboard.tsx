import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import InventoryIcon from "@mui/icons-material/Inventory";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import NavBar from "../components/ui/NavBar";
import useSetProduct from "../hooks/useSetProduct";
import { MenuItem, Select } from "@mui/material";

const categories = ["clothes", "electronics", "furniture", "shoes", "others"];

export default function Dashboard() {
  const { error, res, setData } = useSetProduct();
  const [category, setCategory] = useState(5);
  const handleChange = (event: any) => {
    setCategory(+(event.target.value as string));
  };
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const newProduct = {
      title: data.get("title") as string,
      price: +(data.get("price") as string),
      description: data.get("description") as string,
      image: data.get("image") as string,
      category: category,
    };
    const res = await setData(newProduct);
    console.log(res);
    console.log(error);
  };
  useEffect(() => {
    if (res) {
      Swal.fire("Succesfull", "Product registered", "success");
    }
  }, [res]);

  useEffect(() => {
    if (error) {
      Swal.fire("Error in the register", error, "error");
    }
  }, [error]);

  return (
    <>
      <NavBar />
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <InventoryIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Set a Product
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="given-name"
                  name="title"
                  required
                  fullWidth
                  id="title"
                  label="Title"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="price"
                  label="Price"
                  name="price"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="description"
                  label="Description"
                  id="description"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  required
                  name="image"
                  label="Image (url)"
                  id="image"
                />
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body2">Category: </Typography>
                <Select
                  id="category"
                  value={category}
                  onChange={handleChange}
                  required
                >
                  {categories.map((cat, i) => (
                    <MenuItem value={i + 1} key={i}>
                      {cat}
                    </MenuItem>
                  ))}
                </Select>
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Set up
            </Button>
          </Box>
        </Box>
      </Container>
    </>
  );
}
