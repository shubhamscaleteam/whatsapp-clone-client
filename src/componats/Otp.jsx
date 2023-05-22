import { Button } from "@mui/material";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, Zoom, toast } from "react-toastify";

const Otp = () => {
  const notifySuccess = (e) => toast.success(e);
  const notify = (e) => toast.error(e);

  const [otp, setOtp] = useState(null);

  const getvalueOfotp = (e) => {
    setOtp(e.target.value);
  };

  const handleVerifyButton = (e) => {
    e.preventDefault();

    if (otp <= null) {
      notify("please enter otp..!!");
    } else if (otp.length !== 4) {
      notify("please enter valid otp..!!");
    } else notifySuccess("success..!!");
  };

  return (
    <>
      <ToastContainer
        position="bottom-right"
        theme="dark"
        autoClose={2000}
        loginData
        transition={Zoom}
      />

      <div className="login-box">
        <h2>Login</h2>
        <form onSubmit={handleVerifyButton}>
          <div className="user-box">
            <input
              type="number"
              maxlength="4"
              name="otp"
              onChange={getvalueOfotp}
            />
            <label>Enter otp</label>
          </div>
          <Link to="/register" className="linkTag">
            Didn't receive the code? Resend
          </Link>{" "}
          <br />
          <br />
          <Button variant="outlined" color="info" type="submit">
            Verify
          </Button>
        </form>
      </div>
    </>
  );
};

export default Otp;
