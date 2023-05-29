import React, { useState } from "react";
import { Button } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { NEW_PASSWORD } from "../graphQL/mutation";
import { ToastContainer, Zoom, toast } from "react-toastify";

const NewPassword = () => {
  const [newPassword, setNewPassword] = useState({
    newPassword: "",
    confirmPassword: "",
  });

  const location = useLocation();

  const [newPasswordData] = useMutation(NEW_PASSWORD);

  const navigate = useNavigate();

  const token = location.search.split("?token=")[1];

  const errorToast = (e) => toast.error(e);

  const valueOfNewPassword = (e) => {
    setNewPassword({ ...newPassword, [e.target.name]: e.target.value });
  };

  const submitNewPassword = (e) => {
    e.preventDefault();

    if (
      newPassword.newPassword.length <= 3 ||
      newPassword.confirmPassword.length <= 3
    ) {
      errorToast("enter more than three letter or number");
    } else {
      newPasswordData({
        variables: {
          token: token,
          input: newPassword,
        },
      })
        .then(() => {
          navigate("/");
        })
        .catch((e) => {
          errorToast(e.message);
        });
    }
  };
  return (
    <>
      <ToastContainer
        position="bottom-right"
        theme="dark"
        autoClose={1000}
        loginData
        transition={Zoom}
      />
      <div>
        <div>
          <div className="login-box">
            <h2>New Password</h2>
            <form onSubmit={submitNewPassword}>
              <div className="user-box">
                <input
                  type="password"
                  name="newPassword"
                  onChange={valueOfNewPassword}
                />
                <label>New password</label>
              </div>
              <div className="user-box">
                <input
                  type="password"
                  name="confirmPassword"
                  onChange={valueOfNewPassword}
                />
                <label>Confirm password</label>
              </div>

              <Button variant="outlined" color="info" type="submit">
                submit
              </Button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default NewPassword;
