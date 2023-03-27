import { Root } from "react-dom/client";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import shopApi from "../api/shopApi";
import {
  clearErrorMessage,
  onChecking,
  onLogin,
  onLogout,
} from "../store/slices/authSlice";
import { RegisterUser } from "../interfaces/index";

interface Props {
  email: string;
  password: string;
}

export const useAuthStore = () => {
  const dispatch = useDispatch();
  const { status, errorMessage, user } = useSelector(
    (state: RootState) => state.auth
  );
  const startLogin = async ({ email, password }: Props) => {
    dispatch(onChecking());

    try {
      const { data } = await shopApi.post("/auth", { email, password });
      localStorage.setItem("token", data.token);
      localStorage.setItem("token-init-date", new Date().getTime().toString());
      dispatch(
        onLogin({ name: data.name, uid: data.uid, isAdmin: data.isAdmin })
      );
    } catch (error) {
      dispatch(onLogout("email or password wrong"));
      setTimeout(() => {
        dispatch(clearErrorMessage());
      }, 10);
    }
  };
  const startRegister = async (user: RegisterUser) => {
    dispatch(onChecking());

    try {
      const { data } = await shopApi.post("/auth/new", user);
      localStorage.setItem("token", data.token);
      localStorage.setItem("token-init-date", new Date().getTime().toString());
      dispatch(
        onLogin({ name: data.name, uid: data.uid, isAdmin: data.isAdmin })
      );
    } catch (error: any) {
      dispatch(onLogout(error.response.data?.msg || "something is wrong"));
      setTimeout(() => {
        dispatch(clearErrorMessage());
      }, 10);
    }
  };
  const checkAuthToken = async () => {
    const token = localStorage.getItem("token");
    if (!token) return dispatch(onLogout("token expired"));

    try {
      const { data } = await shopApi.get("/auth/renew");
      localStorage.setItem("token", data.token);
      localStorage.setItem("token-init-date", new Date().getTime().toString());
      dispatch(
        onLogin({ name: data.name, uid: data.uid, isAdmin: data.isAdmin })
      );
    } catch (error) {
      localStorage.clear();
      dispatch(onLogout(""));
    }
  };
  const startLogout = () => {
    localStorage.clear();
    dispatch(onLogout(undefined));
  };

  return {
    errorMessage,
    user,
    status,
    startLogin,
    startRegister,
    checkAuthToken,
    startLogout,
  };
};
