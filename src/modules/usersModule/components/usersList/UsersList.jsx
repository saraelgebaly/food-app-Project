import React, { useEffect, useState } from "react";
import userLogo from "../../../../assets/images/header.png";
import Header from "../../../SharedModule/components/header/Header";
import axios from "axios";
import NoData from "../../../SharedModule/components/NoData/NoData";
import nodata from "../../../../assets/images/no-data.png";

export default function UsersList() {
  const [usersList, setUsersList] = useState([]);
  const [userNameValue, setUserNameValue] = useState([]);
  const [group, setGroup] = useState([1, 2]);

  const [arrayOfPages, setArrayOfPages] = useState([]);

  const getUsersList = async (userName, groups, pageSize, pageNo) => {
    try {
      const response = await axios.get(
        `https://upskilling-egypt.com:3006/api/v1/Users/?pageSize=${pageSize}&pageNumber=${pageNo}`,

        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
          params: {
            userName: userName,
            groups: groups,
          },
        }
      );
      setArrayOfPages(
        Array(response.data.totalNumberOfPages)
          .fill()
          .map((_, i) => i + 1)
      );
      setUsersList(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getUserNameValue = (input) => {
    setUserNameValue(input.target.value);
    getUsersList(input.target.value, group, 20, 1);
  };

  const getGroupValue = (input) => {
    setGroup(input.target.value);

    if (input.target.value == 1) {
      getUsersList(userNameValue, 1, 20, 1);
    } else getUsersList(userNameValue, 2, 20, 1);
  };

  useEffect(() => {
    getUsersList(userNameValue, group, 20, 1);
  }, []);
  return (
    <>
      <Header
        title={"Users list"}
        description={
          "You can now add your items that any user can order it from the Application and you can edit"
        }
        imgUrl={userLogo}
      />
      <div className="container-fluid p-4 ">
        <div className="row">
          <div className="col-md-6">
            <h3>Users Table Details</h3>
            <p>You can check all details</p>
          </div>
        </div>
      </div>
      <div className="filteration m-3">
        <div className="row">
          <div className="col-md-6">
            <input
              type="text"
              className="form-control"
              placeholder="search by username..."
              onChange={getUserNameValue}
            />
          </div>
          <div className="col-md-3">
            <select className="form-control" onChange={getGroupValue}>
              <option value="">Search by Group</option>

              <option value={1}>Admin</option>
              <option value={2}>User</option>
            </select>
          </div>
        </div>
      </div>
      <table className="table mx-3">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Image</th>
            <th scope="col">Email</th>
            <th scope="col">Counrty</th>
            <th scope="col">Phone Number</th>
            <th scope="col">Group</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {usersList.length > 0 ? (
            usersList.map((item, index) => (
              <tr key={item.id}>
                <th scope="row"> {index + 1} </th>
                <td>{item.userName}</td>
                <td>
                  {item.imagePath ? (
                    <img
                      className="recipes-img"
                      src={
                        "https://upskilling-egypt.com:3006/" + item.imagePath
                      }
                      alt=""
                    />
                  ) : (
                    <img className="recipes-img" src={nodata} alt="" />
                  )}
                </td>
                <td>{item.email}</td>
                <td>{item.country}</td>
                <td>{item.country}</td>
                <td>{item.group.name}</td>
                <td>
                  <i className="fa fa-trash text-danger"></i>
                </td>
              </tr>
            ))
          ) : (
            <NoData />
          )}
        </tbody>
      </table>
      <nav
        aria-label="Page navigation example"
        className="d-flex justify-content-center"
      >
        <ul className="pagination">
          <li className="page-item">
            <a className="page-link text-success" aria-label="Previous">
              <span aria-hidden="true">&laquo;</span>
            </a>
          </li>
          {arrayOfPages.map((pageNo) => (
            <li
              onClick={() => getUsersList(userNameValue, group, 20, pageNo)}
              className="page-item"
            >
              <a className="page-link text-success">{pageNo}</a>
            </li>
          ))}

          <li className="page-item">
            <a className="page-link text-success" aria-label="Next">
              <span aria-hidden="true">&raquo;</span>
            </a>
          </li>
        </ul>
      </nav>
    </>
  );
}
