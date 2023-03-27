import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { Link } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useEffect, useState } from "react";
import { useAuthStore } from "../hooks/useAuthStore";
import Swal from "sweetalert2";

export default function SignUp() {
  const [validCred, setValidCred] = useState<boolean>(false);
  const { startRegister, errorMessage } = useAuthStore();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const cred = data.get("credentials");
    const newUser = {
      name: data.get("name") as string,
      email: data.get("email") as string,
      password: data.get("password") as string,
      isAdmin: false,
    };

    if (cred !== "") setValidCred(true);

    if (cred === "4455") {
      newUser.isAdmin = true;
      setValidCred(false);
    }
    startRegister(newUser);
  };

  useEffect(() => {
    if (errorMessage) {
      Swal.fire("Error in the register", errorMessage, "error");
    }
  }, [errorMessage]);

  return (
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
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoComplete="given-name"
                name="name"
                required
                fullWidth
                id="name"
                label="Name"
                autoFocus
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="new-password"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                error={validCred}
                fullWidth
                name="credentials"
                label="credentials"
                id="credentials"
                helperText={validCred && "incorrect credential"}
              />
              <Grid container justifyContent="flex-start">
                <Grid item>
                  <Typography variant="body2" sx={{ color: "gray" }}>
                    Input a credential only if you have one as manager.
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link to="/login">
                <Typography variant="body2">
                  Already have an account? Login here.
                </Typography>
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
