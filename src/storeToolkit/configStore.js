import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import thunk from "redux-thunk";
import { quanLyPhimReducer } from "./quanLyPhim/quanLyPhimReducer";

const rootReducer = combineReducers({
  quanLyPhimReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: [thunk],
  devTools: true,
});
