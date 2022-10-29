import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  getSeatList,
  getCheckedList,
  postCheckOut,
} from "../../store/quanLyDatVe/quanLyDatVeReducer";
import "./Checkout.css";
import { CloseOutlined } from "@ant-design/icons";
import _ from "lodash";
import { NumericFormat } from "react-number-format";

const Checkout = () => {
  const dispatch = useDispatch();
  const param = useParams();
  console.log("param: ", param.movieIds);
  useEffect(() => {
    dispatch(getSeatList(param.movieIds));
  }, []);
  const { seatList, checkedList } = useSelector(
    (state) => state.quanLyDatVeReducer
  );
  console.log("checkedList: ", checkedList);
  console.log("seatList: ", seatList);

  const renderSeat = () => {
    return seatList.danhSachGhe?.map((seat, id) => {
      let classVipSeat = seat?.loaiGhe === "Vip" ? "vipSeat" : "";
      let classAvailableSeat = seat?.daDat === true ? "availableSeat" : "";
      let classCheckedSeat = "";
      let iCheckedSeat = checkedList.findIndex(
        (checkedSeat) => checkedSeat.maGhe === seat.maGhe
      );
      if (iCheckedSeat != -1) {
        classCheckedSeat = "selectedSeat";
      }

      return (
        <Fragment key={id}>
          <button
            className={`seat ${classVipSeat} ${classAvailableSeat} ${classCheckedSeat}`}
            onClick={() => dispatch(getCheckedList(seat))}
          >
            {seat.daDat ? <CloseOutlined /> : seat?.stt}
          </button>
        </Fragment>
      );
    });
  };

  return (
    <div className="container mx-auto min-h-screen">
      <div className="grid grid-cols-12">
        <div className="col-span-9">
          <div></div>
          <div className="trapezoid">
            <h3 className="mt-5 text-black text-center">Màn hình</h3>
          </div>
          <div>{renderSeat()}</div>
        </div>
        <div className="col-span-3">
          <h3 className="text-center text-2xl text-green-500">
            <NumericFormat
              className="text-center"
              allowLeadingZeros
              thousandSeparator=","
              value={checkedList.reduce((total, seat, i) => {
                return (total += seat?.giaVe);
              }, 0)}
            />
          </h3>
          <hr />
          <h3 className="text-xl">Phim: {seatList?.thongTinPhim?.tenPhim}</h3>
          <p>Địa điểm: {seatList?.thongTinPhim?.diaChi}</p>
          <p>Ngày chiếu: {seatList?.thongTinPhim?.ngayChieu}</p>
          <hr />
          <div className="my-5 flex flex-wrap">
            <div className="w-full flex flex-wrap">
              <span className="text-red-400 text-lg mr-3">Ghế</span>
              {_.sortBy(checkedList, ["stt"]).map((seat, i) => {
                return (
                  <span key={i} className="text-green-500 text-xl mr-2">
                    {seat.stt}
                  </span>
                );
              })}
            </div>
            <div className="text-right flex">
              <span className="text-green-400 text-lg">Total:</span>
              <span className="text-green-400 text-lg">
                <NumericFormat
                  className="text-end mr-5"
                  allowLeadingZeros
                  thousandSeparator=","
                  value={checkedList.reduce((total, seat, i) => {
                    return (total += seat.giaVe);
                  }, 0)}
                />
                <span>VND</span>
              </span>
            </div>
          </div>
          <hr />
          <div className="my-5">
            <i>Email</i>
          </div>
          <hr />
          <div className="my-5">
            <i>Phone</i>
          </div>
          <hr />
          <div className="mb-0 flex flex-col justify-end">
            <div
              className="bg-green-500 text-white w-full text-center py-3 font-bold text-lg"
              onClick={() => {
                const inforCheckOut = {
                  maLichChieu: param.movieIds,
                  danhSachVe: checkedList,
                };
                dispatch(postCheckOut(inforCheckOut));
                console.log("checkOut", inforCheckOut);
              }}
            >
              Đặt vé
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
