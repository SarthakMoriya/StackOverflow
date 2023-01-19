import decode from "jwt-decode";
import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import logo from "../../assets/logo.png";
import searchIcon from "../../assets/magnifying-glass-solid.svg";
import { setCurrentUser } from "../../actions/currentUser";

import Avatar from "../Avatar/Avatar";

import "./Navbar.css";

const Navbar = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.currentUserReducer);
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
    navigate("/");
    dispatch(setCurrentUser(null));
  };

  useEffect(() => {
    const token = user?.token;
    if (token) {
      const decodedToken = decode(token);
      if (decodedToken.exp * 1000 < new Date().getTime()) {
        handleLogout();
      }
    }
    dispatch(setCurrentUser(JSON.parse(localStorage.getItem("Profile"))));
  }, [dispatch]);
  return (
    <nav className="main-nav">
      <div className="navbar">
        <Link to="/">
          <img src={logo} alt="logo" className="nav-item nav-logo" />
        </Link>
        <Link to="/about" className="nav-item nav-btn">
          About
        </Link>
        <Link to="/contact" className="nav-item nav-btn">
          Contact
        </Link>
        <Link to="/teams" className="nav-item nav-btn">
          For Teams
        </Link>
        <form>
          <input type="text" className="" placeholder="Search..." />
          <img
            src={searchIcon}
            alt="searchIcon"
            width="18"
            className="search-icon"
          />
        </form>
        {user === null ? (
          <Link to="/auth" className="nav-item nav-link">
            Log in
          </Link>
        ) : (
          <>
            
              <Link
                to={`/users/${user.user._id}`}
                style={{ textDecoration: "none" }}
              >
                <Avatar
                  backgroundColor="#009dff"
                  px="10px"
                  py="7px"
                  borderRadius="50%"
                  color="white"
                >
                  {user.user.name[0]}
                </Avatar>
              </Link>
              <button className="nav-link nav-item" onClick={handleLogout}>
                {user === null ? "Log in" : "Log out"}
              </button>
        
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
