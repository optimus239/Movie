import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getMovieDetail } from "../../store/quanLyPhim/quanLyPhimReducer";
import "./MovieDetail.css";
import moment from "moment";
import "../../assets/index";
import { Tabs } from "antd";
import { getShowTimes } from "../../store/quanLyRap/quanLyRapReducer";

const MovieDetail = () => {
  const dispatch = useDispatch();
  const { movieDetail } = useSelector((state) => state.quanLyPhimReducer);
  const param = useParams();
  console.log("param: ", param.movieIds);
  console.log("movieDetail: ", movieDetail);
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

  return (
    <div
      className="container mx-auto h-[1200px] bg-center bg-cover bg-repeat opacity-70 relative"
      style={{ backgroundImage: `url(${movieDetail?.hinhAnh})` }}
    >
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
              <div className="c100 p25">
                <span>{movieDetail?.danhGia}%</span>
                <div className="slice">
                  <div className="bar" />
                  <div className="fill" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="tabShowtime">
          <Tabs
            defaultActiveKey="1"
            tabPosition={mode}
            style={{ height: 500 }}
            items={showTimesList?.heThongRapChieu.map((val, i) => {
              return {
                label: <img src={val.logo} alt="" className="w-9 h-9" />,
                key: i,
                children: val.cumRapChieu.map((item, i) => (
                  <div key={i}>
                    <div className="flex">
                      <div>
                        <img src={item.hinhAnh} alt="" />
                      </div>
                      <div>
                        <div>{item.tenCumRap}</div>
                        <div>{item.diaChi}</div>
                        {item.lichChieuPhim.map((lichChieu, i) => (
                          <div>
                            {moment(lichChieu.ngayChieuGioChieu).format("LT")}
                          </div>
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
