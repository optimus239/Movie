import {
  SearchOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { Button, Input, Space, Table } from "antd";
import React, { useEffect, useRef, useState } from "react";
import Highlighter from "react-highlight-words";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import Swal from "sweetalert2";
import {
  danhSachNguoiDung,
  useQuanLyNguoiDung,
  xoaNguoiDung,
} from "../../../store/quanLyNguoiDung";
import { removeVietnameseTones } from "../../../ultis/convertAlphabetToAlphanumeric";

const User = () => {
  const { userList } = useQuanLyNguoiDung();

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(danhSachNguoiDung());
  }, []);

  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div
        style={{
          padding: 8,
        }}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: "block",
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? "#1890ff" : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: "#ffc069",
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });
  const columns = [
    {
      title: "STT",
      dataIndex: "stt",
      key: "stt",
      width: "5%",
      //   ...getColumnSearchProps("name"),
    },
    {
      title: "T??i kho???n",
      dataIndex: "taiKhoan",
      key: "taiKhoan",
      width: "10%",
      sorter: (a, b) => {
        let taiKhoanA = removeVietnameseTones(a.taiKhoan.toLowerCase());
        let taiKhoanB = removeVietnameseTones(b.taiKhoan.toLowerCase());
        if (taiKhoanA > taiKhoanB) {
          return 1;
        }
        return -1;
      },
      sortDirections: ["ascend", "descend", "ascend"],
      ...getColumnSearchProps("taiKhoan"),
    },
    {
      title: "M???t kh???u",
      dataIndex: "matKhau",
      key: "matKhau",
      width: "10%",
      //   ...getColumnSearchProps("address"),
      //   sorter: (a, b) => a.address.length - b.address.length,
      //   sortDirections: ["descend", "ascend"],
    },
    {
      title: "H??? t??n",
      dataIndex: "hoTen",
      key: "hoTen",
      width: "10%",
      sorter: (a, b) => {
        let hoTenA = removeVietnameseTones(a.hoTen.toLowerCase());
        let hoTenB = removeVietnameseTones(b.hoTen.toLowerCase());
        if (hoTenA > hoTenB) {
          return 1;
        }
        return -1;
      },
      sortDirections: ["ascend", "descend", "ascend"],
      ...getColumnSearchProps("hoTen"),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      width: "10%",
      ...getColumnSearchProps("email"),
    },
    {
      title: "S??? ??i???n tho???i",
      dataIndex: "soDT",
      key: "soDT",
      width: "10%",
      //   ...getColumnSearchProps("age"),
    },
    {
      title: "Lo???i ng?????i d??ng",
      dataIndex: "maLoaiNguoiDung",
      key: "maLoaiNguoiDung",
      //   width: "10%",
      sorter: (a, b) => {
        let maLoaiNguoiDungA = removeVietnameseTones(
          a.maLoaiNguoiDung.toLowerCase()
        );
        let maLoaiNguoiDungB = removeVietnameseTones(
          b.maLoaiNguoiDung.toLowerCase()
        );
        if (maLoaiNguoiDungA > maLoaiNguoiDungB) {
          return 1;
        }
        return -1;
      },
      sortDirections: ["ascend", "descend", "ascend"],
      //   ...getColumnSearchProps("age"),
    },
    {
      title: "H??nh ?????ng",
      //   dataIndex: "maPhim",
      width: "10%",
      render: (text, record, index) => {
        return (
          <div>
            <NavLink
              to={`addedituser/${record.taiKhoan}`}
              className="text-xl text-green-400 hover:text-red-400 mr-2"
            >
              <EditOutlined />
            </NavLink>
            <span
              style={{ cursor: "pointer" }}
              className="text-xl text-gray-400 hover:text-red-400 mr-2"
              onClick={() => {
                Swal.fire({
                  title: "X??a t??i kho???n ng?????i d??ng?",
                  text: "B???n s??? kh??ng th??? kh??i ph???c l???i!",
                  icon: "warning",
                  showCancelButton: true,
                  confirmButtonColor: "#3085d6",
                  cancelButtonColor: "#d33",
                  confirmButtonText: "X??a ng?????i d??ng!",
                }).then((result) => {
                  if (result.isConfirmed) {
                    dispatch(xoaNguoiDung(record.taiKhoan));
                  }
                });
              }}
            >
              <DeleteOutlined />
            </span>
          </div>
        );
      },
    },
  ];
  const data = userList.map((item, index) => ({ ...item, stt: index + 1 }));
  return (
    <div>
      <h3>Qu???n L?? User</h3>
      <NavLink to={"/admin/user/addedituser"}>
        <Button type="primary" className="mb-2 hover:text-blue-500">
          Th??m ng?????i d??ng
        </Button>
      </NavLink>
      <Table rowKey="taiKhoan" columns={columns} dataSource={data} />;
    </div>
  );
};

export default User;
