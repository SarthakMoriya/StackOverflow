import decode from "jwt-decode";
import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import logo from "../../assets/logo.png";
import searchIcon from "../../assets/magnifying-glass-solid.svg";
import { setCurrentUser } from "../../actions/currentUser";
import { useAuth0 } from "@auth0/auth0-react";
import { signup, login } from "../../actions/auth";
import Avatar from "../Avatar/Avatar";

import "./Navbar.css";

const Navbar = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const { loginWithRedirect } = useAuth0();
  const { logout } = useAuth0();
  const dispatch = useDispatch();
  const user1 = useSelector((state) => state.currentUserReducer);
  const navigate = useNavigate();

  const handleSaveUser=()=>{
    if(isAuthenticated){
      dispatch()
    }
  }
  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
    navigate("/");
    dispatch(setCurrentUser(null));
  };

  useEffect(() => {
    console.log(isAuthenticated)

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
        <Link to="/payment" className="nav-item nav-btn">
          Payment
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
        {user1 === null ? (
          <Link to="/auth" className="nav-item nav-link">
            Log in
          </Link>
        ) : (
          <>
            <Link
              to={`/users/${user1.user._id}`}
              style={{ textDecoration: "none" }}
            >
              <Avatar
                backgroundColor="#009dff"
                px="10px"
                py="7px"
                borderRadius="50%"
                color="white"
              >
                {user1.user.name[0]}
              </Avatar>
            </Link>
            <button className="nav-link nav-item" onClick={handleLogout}>
              {user1 === null ? "Log in" : "Log out"}
            </button>
          </>
        )}
        {/* {isAuthenticated ? (
          <button
            onClick={() =>
              logout({ logoutParams: { returnTo: window.location.origin } })
            }
          >
            Log Out
          </button>
        ) : (
          <button onClick={() => loginWithRedirect()}>Log In</button>
        )} */}
      </div>
      <div className="sub-nav">
        <Link to="/">Home</Link>
        <Link to="/questions">Questions</Link>
        <Link to="/tags">Tags</Link>
        <Link to="/users">Users</Link>
        <Link to="/posts">Community</Link>
      </div>
    </nav>
  );
};

export default Navbar;
