import React from "react";
import { NavLink } from "react-router-dom";
import Globe from '../../assets/Globe.svg'

import "./LeftSidebar.css";

const LeftSidebar = () => {
  return (
    <div className="left-sidebar">
      <nav className="side-nav">
        <NavLink to="/" className="side-nav-links" activeClassName="active">
          <p>Home</p>
        </NavLink>
        <div className="side-nav-div">
          <div>
            <p>PUBLIC</p>
          </div>
          <NavLink to="/questions" className="side-nav-links">
            <img src={Globe} alt="Globe" />
            <p style={{ paddingLeft: "10px" }}>Questions</p>
          </NavLink>
          <NavLink to="/tags" className="side-nav-links" activeClassName='active' style={{ paddingLeft: "40px" }}>
            <p>Tags</p>
            </NavLink>
          <NavLink to="/users" className="side-nav-links" activeClassName='active' style={{ paddingLeft: "40px" }}>
            <p>Users</p>
            </NavLink>
        </div>
      </nav>
    </div>
  );
};

export default LeftSidebar;
