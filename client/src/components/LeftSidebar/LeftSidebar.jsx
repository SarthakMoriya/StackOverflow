import React from "react";
import { NavLink } from "react-router-dom";
import Globe from '../../assets/Globe.svg'

import "./LeftSidebar.css";

const LeftSidebar = () => {
  return (
    <div className="left-sidebar">
      <nav className="side-nav">
        <NavLink to="/" className="side-nav-links" >
          <p className="px-3 py-2">Home</p>
        </NavLink>
        <div className="side-nav-div px-3">
          <div className="pl-3">
            <p>PUBLIC</p>
          </div>
          <NavLink to="/questions" className="side-nav-links mt-2 border-t border-t-black">
            <img src={Globe} alt="Globe" />
            <p className="px-3 py-2 ">Questions</p>
          </NavLink>
          <NavLink to="/tags" className="side-nav-links" style={{ paddingLeft: "40px" }}>
            <p className="px-3 py-2" >Tags</p>
            </NavLink>
          <NavLink to="/users" className="side-nav-links"  style={{ paddingLeft: "40px" }}>
            <p className="px-3 py-2">Users</p>
            </NavLink>
          <NavLink to="/posts" className="side-nav-links"  style={{ paddingLeft: "40px" }}>
            <p className="px-3 py-2">Community</p>
            </NavLink>
        </div>
      </nav>
    </div>
  );
};

export default LeftSidebar;
