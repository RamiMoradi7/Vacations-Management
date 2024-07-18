import { configureStore } from "@reduxjs/toolkit";
import { AppState } from "./AppState";
import { authReducers } from "./AuthSlice";
import { vacationsReducers } from "./VacationsSlice";

export const appStore = configureStore<AppState>({
  reducer: {
    user: authReducers,
    vacations: vacationsReducers,
  },
});
