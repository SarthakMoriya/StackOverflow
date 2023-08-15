import * as api from "../api";
import setCurrentuser from "./currentUser";

export const signup = (authData, navigate) => async (dispatch) => {
  try {
    //if failed --> In data we would get message "Email already exists" json format
    //else data would be user,token,message,etc...
    const { data } = await api.signUp(authData);
    dispatch({ type: "AUTH", data });
    //in the above dispatch Profile was created
    dispatch(setCurrentuser(JSON.parse(localStorage.getItem("Profile"))));
    navigate("/");
  } catch (err) {
    console.log(err.message);
  }
};
export const login = (authData, navigate) => async (dispatch) => {
  try {
    const { data } = await api.logIn(authData);
    dispatch({ type: "AUTH", data });
    //in the above dispatch Profile was created
    dispatch(setCurrentuser(JSON.parse(localStorage.getItem("Profile"))));
    navigate("/");
  } catch (err) {
    console.log(err);
  }
};

export const updatePassword = (authdata) => async (dispatch) => {
  try {
    const { data } = await api.changePassword(authdata);
    console.log(data);
  } catch (error) {
    console.log(error.message);
  }
};

export const recoverPassword = (email, navigate) => async (dispatch) => {
  try {
    console.log(email);
    //Only Generates and send OTP
    const { data } = await api.recoverPassword(email);
    console.log(data);
    localStorage.setItem("otp", data.otp);
    navigate(`/recovery/${email.useremail}`);
  } catch (error) {
    console.log(error.message);
  }
};

export const newPassword = ({email, password}) => async (dispatch) => {
  try {
    const { data } = await api.newPassword({
      email,
      new_password: password,
    });
    console.log(data);
  } catch (error) {
    console.log(error.message);
  }
};
