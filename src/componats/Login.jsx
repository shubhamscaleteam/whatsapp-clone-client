import React, { useState } from "react";

// *** Imported from mui/material..!!

import { Button } from "@mui/material";

// *** Imported from react-router-dom..!!

import { Link, useNavigate } from "react-router-dom";

// *** Imported from apollo/client..!!

import { useMutation, useQuery } from "@apollo/client";

// *** Imported from react-toastify..!!

import { ToastContainer, Zoom, toast } from "react-toastify";

// *** Imported from localstorage..!!

import localStorage from "local-storage";

// *** Imported from custom files..!!

import { GET_USER_BY_EMAIL } from "../graphQL/query";
import { LOGIN_USER } from "../graphQL/mutation";

const Login = () => {
  // *** use useMutation hook to add login data...!!

  const [loginData, { loading }] = useMutation(LOGIN_USER);

  const [loginDetails, setLoginDetails] = useState({
    email: "",
    password: "",
  });

  // *** use useQuery hook to get user data...!!

  const { data } = useQuery(GET_USER_BY_EMAIL, {
    variables: {
      email: loginDetails.email,
    },
  });

  // *** use navigate hook...!!

  const navigate = useNavigate();

  // *** toast message if error accure or user login successfully..!!

  const notifySuccess = (e) => toast.success(e);

  const notify = (e) => toast.error(e);

  const notifyInfo = (e) => toast.info(e);

  // *** get values of email and password fields..!

  const getValue = (e) => {
    setLoginDetails({ ...loginDetails, [e.target.name]: e.target.value });
  };

  if (loading) {
    notifyInfo("Loading..🚀");
  }

  const submitHandale = (e) => {
    e.preventDefault();

    //**** validation of email and password ...!!

    if (loginDetails.email.length === 0) {
      notify("Enter email..!!");
    } else if (loginDetails.password.length === 0) {
      notify("enter password..!!");
    } else {
      loginData({
        variables: {
          input: loginDetails,
        },
      })
        .then((res) => {
          // console.log("daadsadasd",data)

          if (data.user.id) {
            // *** set token to localStorage..!!
            localStorage.clear();

            localStorage.set("token", res.data.loginUser.token);

            notifySuccess("Login successfully..!!");

            localStorage.set("loginUserId", data.user.id);

            navigate(`/chat/${data.user.id}`);
          }
        })
        .catch((error) => {
          notify(error.message);
        });
    }
  };

  return (
    <>
      {/*** Toast messages..!! */}

      <ToastContainer
        position="bottom-right"
        theme="dark"
        autoClose={900}
        loginData
        transition={Zoom}
      />

      {/*** Login Form ...!!*/}

      <div className="login-box">
        <h2>Login</h2>
        <form onSubmit={submitHandale}>
          <div className="user-box">
            <input
              type="email"
              autoComplete="off"
              onChange={getValue}
              name="email"
            />
            <label>Email</label>
          </div>
          <div className="user-box">
            <input
              type="password"
              autoComplete="off"
              name="password"
              onChange={getValue}
            />
            <label>Password</label>
          </div>
          <Link to="/forgotpassword" className="linkTag">
            Forgot password?
          </Link>
          <br />
          <br />
          <Link to="/register" className="linkTag">
            Don't have an account yet? register
          </Link>{" "}
          <br />
          <br />
          <Button variant="outlined" color="info" type="submit">
            Login
          </Button>
        </form>
      </div>
    </>
  );
};

export default Login;
