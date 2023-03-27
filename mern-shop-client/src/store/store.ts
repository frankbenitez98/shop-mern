import { configureStore } from "@reduxjs/toolkit";
import dataReducer from "./slices/dataSlice";
import uiReducer from "./slices/uiSlice";
import authReducer from "./slices/authSlice";

const store = configureStore({
  reducer: {
    data: dataReducer,
    ui: uiReducer,
    auth: authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
