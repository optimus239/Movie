import React, { useRef, useState, useEffect } from "react";
import { Button, Input, Space, Table } from "antd";
import { getMovieList, useQuanLyPhim } from "../../../store/quanLyPhim";
import { useDispatch } from "react-redux";
import {
  SearchOutlined,
  DeleteOutlined,
  EditOutlined,
} from "@ant-design/icons";
import { removeVietnameseTones } from "../../../ultis/convertAlphabetToAlphanumeric";
import { NavLink } from "react-router-dom";
import Highlighter from "react-highlight-words";

const Films = () => {
  const { movieList } = useQuanLyPhim();
  console.log("movieList: ", movieList);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getMovieList());
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
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
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
      title: "Mã Phim",
      dataIndex: "maPhim",
      width: 130,
      key: "maPhim",
      ...getColumnSearchProps("Mã Phim"),
      // specify the condition of filtering result
      // here is that finding the name started with `value`

      sorter: (a, b) => a.maPhim - b.maPhim,
      defaultSortOrder: "descend",
      sortDirections: ["ascend", "descend", "ascend"],
    },
    {
      title: "Hình Ảnh",
      width: 100,
      dataIndex: "hinhAnh",
      render: (text, record, index) => {
        return <img width={30} src={text} alt="tenPhim" />;
      },
    },
    {
      title: "Tên Phim",
      dataIndex: "tenPhim",
      width: 200,
      key: "tenPhim",
      ...getColumnSearchProps("Tên Phim"),
      onFilter: (value, record) => record.tenPhim.indexOf(value) === 0,
      sorter: (a, b) => {
        let tenPhimA = removeVietnameseTones(a.tenPhim.toLowerCase());
        let tenPhimB = removeVietnameseTones(b.tenPhim.toLowerCase());
        if (tenPhimA > tenPhimB) {
          return 1;
        }
        return -1;
      },
      sortDirections: ["ascend", "descend", "ascend"],
    },
    {
      title: "Mô Tả",
      dataIndex: "moTa",
      render: (text, record, index) => {
        return text.length > 50 ? text.substr(0, 50) + "..." : text;
      },
    },
    {
      title: "Hành động",
      dataIndex: "action",
      render: (text, record, index) => {
        return (
          <div>
            <span className="text-xl text-green-400 hover:text-red-400 mr-2">
              <EditOutlined />
            </span>
            <span className="text-xl text-gray-400 hover:text-red-400">
              <DeleteOutlined />
            </span>
          </div>
        );
      },
    },
  ];
  const data = movieList;

  return (
    <div>
      <h3>Quản Lý Phim</h3>
      <NavLink to={"/admin/films/addfilm"}>
        <Button className="mb-2 hover:text-blue-500">Thêm mới phim</Button>
      </NavLink>
      <Table rowKey="maPhim" columns={columns} dataSource={data} />
    </div>
  );
};

export default Films;
