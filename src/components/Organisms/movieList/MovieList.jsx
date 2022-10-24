import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMovieList } from "../../../storeToolkit/quanLyPhim/quanLyPhimReducer";
import Slider from "react-slick";
import styled from "styled-components";
import styleSlick from "./MovieList.css";
import { Card } from "antd";
import { useSearchParams } from "react-router-dom";

const { Meta } = Card;

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "red" }}
      onClick={onClick}
    />
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "green" }}
      onClick={onClick}
    />
  );
}

const settings = {
  className: "center",
  centerMode: true,
  infinite: true,
  centerPadding: "160px",
  slidesToShow: 3,
  speed: 500,
  rows: 2,
  slidesPerRow: 1,
  variableWidth: true,
  nextArrow: <SampleNextArrow />,
  prevArrow: <SamplePrevArrow />,
};

const MovieList = () => {
  const [searchParams, setSearchParams] = useSearchParams({
    isShowing: true,
  });
  console.log(searchParams.get("isShowing"));
  const dispatch = useDispatch();
  const { movieList } = useSelector((state) => state.quanLyPhimReducer);
  console.log("movieList: ", movieList);

  useEffect(() => {
    dispatch(getMovieList());
  }, []);

  const renderMovie = () =>
    movieList
      .filter(
        (val) => val.dangChieu.toString() === searchParams.get("isShowing")
      )
      .map((val) => (
        <div key={val.maPhim}>
          <Card
            hoverable
            className={`${styleSlick["width-item"]}`}
            cover={
              <img alt="example" src={val.hinhAnh} className="w-72 h-72" />
            }
          >
            <Meta title={val.tenPhim} />
          </Card>
        </div>
      ));

  return (
    <div className="container mx-auto movie-list ">
      <div className="btn-movie flex justify-center">
        <button
          className="btn-playing mr-12"
          onClick={() => {
            setSearchParams({
              isShowing: true,
            });
          }}
        >
          <p>NOW PLAYING</p>
        </button>
        <button
          className="btn-coming"
          onClick={() => {
            setSearchParams({
              isShowing: false,
            });
          }}
        >
          <p>COMING SOON</p>
        </button>
      </div>
      <Slider {...settings}>{renderMovie()}</Slider>
    </div>
  );
};

export default MovieList;
