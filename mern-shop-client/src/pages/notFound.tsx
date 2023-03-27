import React from "react";
import { Box, Button, Typography } from "@mui/material";
import { purple } from "@mui/material/colors";
import { useNavigate } from "react-router-dom";

export default function NotFound() {
  const router = useNavigate();
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        minHeight: "100vh",
      }}
    >
      <Typography variant="h1">404</Typography>
      <Typography variant="h6">
        The page you’re looking for doesn’t exist.
      </Typography>
      <Button
        variant="contained"
        onClick={() => router("/")}
        sx={{ marginTop: "50px" }}
      >
        Back Home
      </Button>
    </Box>
  );
}
