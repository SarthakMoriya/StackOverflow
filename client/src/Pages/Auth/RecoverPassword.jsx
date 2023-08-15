import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import "./Auth.css";
import { newPassword } from "../../actions/auth";

const RecoveryPassword = () => {
  //isSignupPage?? initially false ie we are not on signup
  const [confirmPassword, setConfirmPassword] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const notify = (message) => toast.success(`${message}`);
  const notifyerror = (message) => toast.error(`${message}`);

  const handleSubmit = (e) => {
    e.preventDefault();
    const generatedotp = localStorage.getItem("otp");
    if (generatedotp !== otp) {
      notifyerror("OTP is incorrect");
      return;
    } else {
      dispatch(newPassword({ email: id, password }));
      notify("Password updated...");
      notify("redirecting to login page");
      setTimeout(() => {
        navigate("/auth");
      }, 2000);
    }
  };
  return (
    <section className="auth-section">
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <div className="auth-container-2">
        <form onSubmit={handleSubmit}>
          <label htmlFor="otp">
            <h4>OTP:</h4>
          </label>
          <input
            type="text"
            id="otp"
            name="otp"
            onChange={(e) => {
              setOtp(e.target.value);
            }}
            placeholder="Enter OTP..."
            className="input-width"
          />
          <label htmlFor="password">
            <h4>New Password:</h4>
          </label>
          <input
            type="password"
            id="password"
            name="password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            placeholder="Enter new password..."
            className="input-width"
          />
          <label htmlFor="cpassword">
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <h4>Confirm New Password:</h4>
            </div>
          </label>
          <input
            type="password"
            id="password"
            name="cpassword"
            onChange={(e) => {
              setConfirmPassword(e.target.value);
            }}
            placeholder="Enter Password"
            className="input-width"
          />

          <button type="submit" className="auth-btn">
            Change password
          </button>
        </form>
      </div>
    </section>
  );
};

export default RecoveryPassword;
