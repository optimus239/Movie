import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  getSeatList,
  getCheckedList,
  postCheckOut,
  changeKey,
} from "../../store/quanLyDatVe/quanLyDatVeReducer";
import "./Checkout.css";
import { CloseOutlined, UserOutlined } from "@ant-design/icons";
import _ from "lodash";
import { NumericFormat } from "react-number-format";
import { inforCustomer, useQuanLyNguoiDung } from "../../store/quanLyNguoiDung";
import { Tabs } from "antd";
import moment from "moment";
import { Skeleton } from "antd";

const Checkout = () => {
  const dispatch = useDispatch();
  const param = useParams();
  console.log("param: ", param.movieIds);
  useEffect(() => {
    dispatch(getSeatList(param.movieIds));
  }, []);
  const { seatList, checkedList, isFetching } = useSelector(
    (state) => state.quanLyDatVeReducer
  );
  console.log("checkedList: ", checkedList);
  console.log("seatList: ", seatList);
  const { userLogin } = useQuanLyNguoiDung();

  const [buttonShape, setButtonShape] = useState("circle");
  const [size, setSize] = useState("small");
  if (isFetching) {
    return (
      <div className="container">
        <div>
          <div className=" mt-4 flex text-center ml-[550%]">
            <Skeleton.Button
              className="mr-1"
              shape={buttonShape}
              size={size}
              active
            />
            <Skeleton.Button
              className="mr-1"
              size={size}
              shape={buttonShape}
              active
            />
            <Skeleton.Button
              className="mr-1"
              size={size}
              shape={buttonShape}
              active
            />
          </div>
        </div>
      </div>
    );
  }

  const renderSeat = () => {
    return seatList.danhSachGhe?.map((seat, id) => {
      let classVipSeat = seat?.loaiGhe === "Vip" ? "vipSeat" : "";
      let classAvailableSeat = seat?.daDat === true ? "availableSeat" : "";
      let classCheckedSeat = "";
      //kt ghế có trong mản ghế đang đặt ?
      let iCheckedSeat = checkedList.findIndex(
        (checkedSeat) => checkedSeat.maGhe === seat.maGhe
      );
      let classSeatBy = "";
      if (userLogin.taiKhoan === seat.taiKhoanNguoiDat) {
        classSeatBy = "availableSeatBy";
      }

      if (iCheckedSeat != -1) {
        classCheckedSeat = "selectedSeat";
      }

      return (
        <Fragment key={id}>
          <button
            className={`seat ${classVipSeat} ${classAvailableSeat} ${classCheckedSeat} ${classSeatBy}`}
            onClick={() => dispatch(getCheckedList(seat))}
          >
            {seat.daDat ? (
              classSeatBy != "" ? (
                <UserOutlined />
              ) : (
                <CloseOutlined />
              )
            ) : (
              seat?.stt
            )}
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
          <div className="mt-5 flex justify-center">
            <table className="divide-y divide-gray-200 w-2/3">
              <thead className="bg-gray-50 p-5">
                <tr>
                  <th>Ghế chưa đặt</th>
                  <th>Ghế đang đặt</th>
                  <th>Ghế đã được đặt</th>
                  <th>Ghế VIP</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr>
                  <td>
                    <button className="seat text-center">00</button>
                  </td>
                  <td>
                    <button className="seat availableSeat text-center">
                      <CloseOutlined />
                    </button>
                  </td>
                  <td>
                    <button className="seat availableSeatBy text-center">
                      <UserOutlined />
                    </button>
                  </td>
                  <td>
                    <button className="seat vipSeat text-center">00</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
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
                // dispatch(getSeatList(param.movieIds));
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

// const onChange = (key) => {
//   console.log(key);
// };

export default function () {
  const { tabActive } = useSelector((state) => state.quanLyDatVeReducer);
  const dispatch = useDispatch();
  return (
    <div className="p-5">
      <Tabs
        defaultActiveKey="1"
        activeKey={tabActive}
        onChange={(key) => {
          dispatch(changeKey({ number: key.toString() }));
        }}
        items={[
          {
            label: `01 Chọn ghế thanh toán`,
            key: "1",
            children: <Checkout />,
          },
          {
            label: `02 Kết quả đặt vé`,
            key: "2",
            children: KetQuaDatVe(),
          },
        ]}
      />
    </div>
  );
}

const KetQuaDatVe = () => {
  const dispatch = useDispatch();
  const { customer } = useQuanLyNguoiDung();
  console.log("inforCustomer: ", customer);
  useEffect(() => {
    dispatch(inforCustomer());
  }, []);

  const renderTicketItem = () =>
    customer?.thongTinDatVe.map((ticket, i) => (
      <div className="p-2 lg:w-1/3 md:w-1/2 w-full" key={i}>
        <div className="h-full flex items-center border-gray-200 border p-4 rounded-lg">
          <img
            alt="team"
            className="w-16 h-16 bg-gray-100 object-cover object-center flex-shrink-0 rounded-full mr-4"
            src="https://dummyimage.com/80x80"
          />
          <div className="flex-grow">
            <h2 className="text-gray-900 title-font font-medium">
              {ticket.tenPhim}
            </h2>
            <p className="text-gray-500">
              Giờ chiếu: {moment(ticket.ngayDat).format("hh:mm A")}
            </p>
            <p>Ngày chiếu: {moment(ticket.ngayDat).format("DD-MM-YYYY")}</p>
            <p>Địa điểm: {_.first(ticket.danhSachGhe).tenHeThongRap}</p>
            <p>Rạp: {_.first(ticket.danhSachGhe).tenCumRap}</p>
            <p>Ghế: </p>
            <p>
              {_.sortBy(ticket.danhSachGhe, ["tenGhe"]).map((seat, i) => (
                <button className="mr-2 seat availableSeatBy" key={i}>
                  {seat.tenGhe}
                </button>
              ))}
            </p>
          </div>
        </div>
      </div>
    ));

  return (
    <div className="p-5">
      <h3>Kết quả đặt vé</h3>
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-col text-center w-full mb-20">
            <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-purple-600">
              Lịch sử đặt vé khách hàng
            </h1>
            <p className="lg:w-2/3 mx-auto leading-relaxed text-base">
              Quý khách hàng vui lòng kiểm tra lại thông tin vé
            </p>
          </div>
          <div className="flex flex-wrap -m-2">{renderTicketItem()}</div>
        </div>
      </section>
    </div>
  );
};
