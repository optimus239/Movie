import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { quanLyNguoiDungActions } from "../quanLyNguoiDung";

const initialState = {
  isFetching: false,
  seatList: [],
  error: undefined,
  checkedList: [],
};

export const { reducer: quanLyDatVeReducer, actions: quanLyDatVeActions } =
  createSlice({
    name: "quanLyDatVe",
    initialState,
    reducers: {
      getCheckedList: (state, action) => {
        let updateSeats = [...state.checkedList];
        console.log("updateSeats: ", updateSeats);
        let index = updateSeats.findIndex(
          (seat) => seat.maGhe === action.payload.maGhe
        );
        if (index != -1) {
          updateSeats.splice(index, 1);
        } else {
          updateSeats.push(action.payload);
        }
        console.log("index: ", index);
        console.log("action", action);
        return { ...state, checkedList: updateSeats };
      },
      postCheckOut: (state, action) => {
        console.log("action", action.payload);
      },
    },
    extraReducers: (builder) => {
      builder
        .addCase(getSeatList.pending, (state, action) => {
          state.isFetching = true;
        })
        .addCase(getSeatList.fulfilled, (state, action) => {
          state.isFetching = false;
          state.seatList = action.payload;
        })
        .addCase(getSeatList.rejected, (state, action) => {
          state.isFetching = false;
          state.error = action.payload;
        });
    },
  });

export const getSeatList = createAsyncThunk(
  "quanLyDatVe/getSeatList",
  async (movieId, { rejectWithValue }) => {
    try {
      const result = await axios({
        url: `https://movienew.cybersoft.edu.vn/api/QuanLyDatVe/LayDanhSachPhongVe?MaLichChieu=${movieId}`,
        method: "GET",
        headers: {
          TokenCyberSoft:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCAzMkUiLCJIZXRIYW5TdHJpbmciOiIyMC8wMy8yMDIzIiwiSGV0SGFuVGltZSI6IjE2NzkyNzA0MDAwMDAiLCJuYmYiOjE2NTA0NzQwMDAsImV4cCI6MTY3OTQxODAwMH0.S7l5kogAVJjRW8mjJ5gosJraYq5ahYjrBwnMJAaGxlY",
        },
      });
      return result.data.content;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const postCheckOut = createAsyncThunk(
  "quanLyDatVe/postCheckOut",
  async (model, { rejectWithValue }) => {
    try {
      const result = await axios({
        url: "https://movienew.cybersoft.edu.vn/api/QuanLyDatVe/DatVe",
        method: "POST",
        data: model,
        headers: {
          Authorization: "Bearer " + localStorage.getItem("TOKEN"),
          TokenCyberSoft:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCAzMkUiLCJIZXRIYW5TdHJpbmciOiIyMC8wMy8yMDIzIiwiSGV0SGFuVGltZSI6IjE2NzkyNzA0MDAwMDAiLCJuYmYiOjE2NTA0NzQwMDAsImV4cCI6MTY3OTQxODAwMH0.S7l5kogAVJjRW8mjJ5gosJraYq5ahYjrBwnMJAaGxlY",
        },
      });
      return result.data.content;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const { getCheckedList } = quanLyDatVeActions;
