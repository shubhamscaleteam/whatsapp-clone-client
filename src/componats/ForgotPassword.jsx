import React, { useState } from "react";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { ToastContainer, Zoom, toast } from "react-toastify";

const ForgotPassword = () => {
  const [emailData, setEmailData] = useState("");

  const navigate = useNavigate();

  const notifyInfo = (e) => toast.info(e);

  const getvalue = (e) => {
    setEmailData(e.target.value);
  };

  const getSubmitData = (e) => {
    e.preventDefault();

    notifyInfo("Open your email to reset new password..!!");

    setTimeout(() => {
      navigate("/");
    }, 2000);
  };

  return (
    <>
      <ToastContainer
        position="bottom-right"
        theme="dark"
        autoClose={900}
        loginData
        transition={Zoom}
      />
      <div>
        <div className="login-box">
          <h2>Forgot Password</h2>
          <form onSubmit={getSubmitData}>
            <div className="user-box">
              <input type="email" name="email" onChange={getvalue} />
              <label>Enter Email</label>
            </div>

            <Button variant="outlined" color="info" type="submit">
              Forgot Password
            </Button>
          </form>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
