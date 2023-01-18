import React from "react";
import { useLocation } from "react-router-dom";

import LeftSidebar from '../../components/LeftSidebar/LeftSidebar'

import "./Users.css";
import UsersList from "./UsersList";

const Users = () => {
  const location=useLocation();

  return <div className="home-container-1">
    <LeftSidebar/>
    <div className="home-container-2" style={{marginTop:"30px"}}>
      <h1>Users</h1>
      {
        location.pathname === "/users" ?
        <UsersList/>  :
        <></>
      }
    </div>
  </div>;
};

export default Users;
