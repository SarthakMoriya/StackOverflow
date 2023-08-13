import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useDispatch } from "react-redux";

const GoogleAuth = () => {
  const dispatch = useDispatch();
  const { loginWithRedirect } = useAuth0();
  const handleAuth = () => {
    const data = loginWithRedirect();
    console.log(data);
  };
  return (
    <>
        <br /><br /><br /><br /><br />
      <button onClick={handleAuth}>Log In</button>
    </>
  );
};

export default GoogleAuth;
