import React, { useRef } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { logOut, useQuanLyNguoiDung } from "../store/quanLyNguoiDung";

const Header = () => {
  const { userLogin } = useQuanLyNguoiDung();
  console.log("userLogin: ", userLogin);
  const [navbarOpen, setNavbarOpen] = useState(false);
  console.log("navbarOpen: ", navbarOpen);
  const dispatch = useDispatch();
  const dangXuat = () => {
    dispatch(logOut());
  };
  const titleRef = useRef();
  console.log("navbarOpen: ", navbarOpen);
  const navigate = useNavigate();
  return (
    <>
      <Navbar
        className="flex flex-wrap items-center justify-between px-2 py-5 z-10 w-full"
        style={{ backgroundColor: "rgb(33, 33, 33)" }}
      >
        <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
          <Link
            className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start"
            to="/home"
          >
            <a
              className="uppercase text-red-700 font-bold text-lg items-center"
              href="#pablo"
            >
              Cybersoft
            </a>
            <button
              className="text-white cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none"
              type="button"
              onClick={() => setNavbarOpen(!navbarOpen)}
            >
              <i className="fas fa-bars"></i>
            </button>
          </Link>
          <div
            className={
              "lg:flex flex-grow items-center" +
              (navbarOpen ? " flex" : " hidden")
            }
            id="example-navbar-danger"
          >
            <ul className="flex flex-col lg:flex-row list-none justify-between mb-0">
              <li className="nav-item">
                <a
                  className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75"
                  href="#pablo"
                >
                  <i className="text-lg text-white opacity-75"></i>
                  <Link className="ml-2" to="/home">
                    Trang chủ
                  </Link>
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75"
                  href="#pablo"
                >
                  <i className="text-lg text-white opacity-75"></i>
                  <span className="ml-2">Phim</span>
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75"
                  href="#pablo"
                >
                  <i className="text-lg text-white opacity-75"></i>
                  <span className="ml-2">Rạp</span>
                </a>
              </li>
            </ul>
          </div>
          <div className="flex">
            <button
              className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75"
              onClick={() => {
                navigate("/register");
              }}
            >
              Đăng ký
            </button>
            <button
              className="ml-3 px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75"
              onClick={() => {
                navigate("/login");
              }}
            >
              Đăng nhập
            </button>
          </div>
        </div>
      </Navbar>
    </>
  );
};

export default Header;

const Navbar = styled.div`
  background-color: rgba(112, 110, 110, 0.2);
`;
