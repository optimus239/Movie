import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getMovieDetail } from "../../store/quanLyPhim/quanLyPhimReducer";
import "./MovieDetail.css";
import moment from "moment";
import "../../assets/index";
import { Tabs } from "antd";
import { getShowTimes } from "../../store/quanLyRap/quanLyRapReducer";
import { Rate } from "antd";

const MovieDetail = () => {
  const dispatch = useDispatch();
  const { movieDetail } = useSelector((state) => state.quanLyPhimReducer);
  const param = useParams();
  console.log("param: ", param.movieIds);
  console.log("movieDetail: ", movieDetail);
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(getMovieDetail(param.movieIds));
  }, []);
  useEffect(() => {
    dispatch(getShowTimes(param.movieIds));
  }, []);
  const { showTimesList } = useSelector((state) => state.quanLyRapReducer);
  console.log("showTimesList: ", showTimesList);

  const [mode, setMode] = useState("left");
  const handleModeChange = (e) => {
    setMode(e.target.value);
  };

  const gettoken = () => {
    console.log("local", localStorage.getItem("TOKEN"));
  };
  gettoken();

  return (
    <div className="container mx-auto h-[1200px] relative ">
      <div
        className="bg-center bg-cover bg-repeat opacity-70 absolute w-full h-full blur-sm"
        style={{ backgroundImage: `url(${movieDetail?.hinhAnh})` }}
      ></div>
      <div className="bg-movieDetail p-5">
        <div className="flex mb-12">
          <div className="w-2/5 h-2/5 mr-3">
            <img
              src={movieDetail?.hinhAnh}
              alt={movieDetail?.biDanh}
              className=" object-cover"
            />
          </div>
          <div>
            <div className="font-bold text-3xl text-slate-200 mb-5">
              {movieDetail?.tenPhim}
            </div>
            <div className="text-slate-200 mb-5">
              {moment(movieDetail?.ngayKhoiChieu).format("llll")}
            </div>
            <div className="text-slate-200 mb-5">{movieDetail?.moTa}</div>
            <button className="font-bold text-xl mb-3">
              <a
                href={movieDetail?.trailer}
                target="_blank"
                className="text-red-700"
              >
                TRAILER
              </a>
            </button>
            <div className="clearfix">
              <div className={`c100 p${movieDetail?.danhGia * 10}`}>
                <span>{movieDetail?.danhGia * 10}%</span>
                <div className="slice">
                  <div className="bar" />
                  <div className="fill" />
                </div>
              </div>
              <Rate allowHalf defaultValue={movieDetail?.danhGia / 2} />
            </div>
          </div>
        </div>
        <div className="tabShowtime">
          <div className="text-2xl font-semibold text-gray-300 ">
            <p className="decoration-solid underline-offset-8">Lịch chiếu</p>
          </div>
          <Tabs
            defaultActiveKey="1"
            tabPosition={mode}
            style={{ height: 500 }}
            items={showTimesList?.heThongRapChieu.map((val, i) => {
              return {
                label: (
                  <img src={val.logo} alt="" className="w-9 h-9" key={i} />
                ),
                key: i,
                children: val.cumRapChieu.map((item, i) => (
                  <div key={i}>
                    <div className="flex">
                      <div>
                        <img src={item.hinhAnh} alt="" className="mb-5 mr-5" />
                      </div>
                      <div>
                        <div className="text-neutral-50 text-xl mb-3">
                          {item.tenCumRap}
                        </div>
                        <div className="text-neutral-50 text-lg mb-3">
                          {item.diaChi}
                        </div>
                        {item.lichChieuPhim.map((lichChieu, i) => (
                          <button
                            className="text-neutral-50 mr-5"
                            key={i}
                            onClick={() => {
                              if (localStorage.getItem("USER_LOGIN")) {
                                return navigate(
                                  `/ticketroom/${lichChieu.maLichChieu}`
                                );
                              } else navigate("/login");
                            }}
                          >
                            {moment(lichChieu.ngayChieuGioChieu).format("LT")}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )),
              };
            })}
          />
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;
