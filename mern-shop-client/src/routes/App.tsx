import {
  ThemeProvider,
  createTheme,
  ThemeOptions,
  CssBaseline,
} from "@mui/material";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "../pages/home";
import Login from "../pages/login";
import SignUp from "../pages/signUp";
import NotFound from "../pages/notFound";
import { useAuthStore } from "../hooks/useAuthStore";
import { useEffect } from "react";
import Dashboard from "../pages/dashboard";

const lightThemeOptions: ThemeOptions = {
  palette: {
    mode: "light",
    primary: {
      main: "#28A267",
    },
  },
};

function App() {
  const lightTheme = createTheme(lightThemeOptions);
  const { status, checkAuthToken, user } = useAuthStore();

  // se realiza check del token para poder manejar las rutas protegidas

  useEffect(() => {
    checkAuthToken();
  }, []);

  return (
    <BrowserRouter>
      <ThemeProvider theme={lightTheme}>
        <CssBaseline />
        <Routes>
          {status === "not-authenticated" ? (
            <>
              <Route path="/login" element={<Login />} />
              <Route path="/sign-up" element={<SignUp />} />
              <Route path="/*" element={<Navigate to="/login" />} />
            </>
          ) : (
            <>
              <Route path="/" element={<Home />} />
              <Route path="/*" element={<Navigate to="/" />} />
            </>
          )}
          {user?.isAdmin && <Route path="/dashboard" element={<Dashboard />} />}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
