import React, { useState } from "react";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { ToastContainer, Zoom, toast } from "react-toastify";
import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import { FORGOT_PASSWORD } from "../graphQL/query";

const ForgotPassword = () => {
  const [emailData, setEmailData] = useState("");

  const navigate = useNavigate();

  // const { data: forgotPasswordData } = useLazyQuery(FORGOT_PASSWORD, {
  //   variables: emailData,
  // });

  // const { data: forgotPasswordData } = useQuery(FORGOT_PASSWORD, {
  //   fetchPolicy: "cache-and-network",
  //   variables: {
  //     emailData,
  //   },
  // });

  const [forgotPasswordValue] = useMutation(FORGOT_PASSWORD);

  const notifyInfo = (e) => toast.info(e);

  const getvalue = (e) => {
    setEmailData(e.target.value);
  };

  const getSubmitData = (e) => {
    e.preventDefault();

    forgotPasswordValue({
      variables: {
        email: emailData,
      },
    });

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
