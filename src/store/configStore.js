import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import thunk from "redux-thunk";
import { quanLyPhimReducer } from "./quanLyPhim/quanLyPhimReducer";
import { quanLyNguoiDungReducer } from "./quanLyNguoiDung";

const rootReducer = combineReducers({
  quanLyPhimReducer,
  quanLyNguoiDungReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: [thunk],
  devTools: true,
});
