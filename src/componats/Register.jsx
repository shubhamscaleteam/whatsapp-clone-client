import React, { useRef, useState } from "react";

// *** Imported from custom files..!!

import "../css/register.css";
import { REGISTER_USER } from "../graphQL/mutation";

// *** Imported from mui/material..!!

import { Button } from "@mui/material";

// *** Imported from react-router-dom..!!

import { Link, useNavigate } from "react-router-dom";

// *** Imported from apollo/client..!!

import { useMutation } from "@apollo/client";

// *** Imported from react-toastify..!!

import { ToastContainer, Zoom, toast } from "react-toastify";

const Register = () => {
  const [registerDetails, setRegisterDetails] = useState({
    userName: "",
    phoneno: null,
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const ref = useRef(null);

  // *** use useMutation hook to add register user...!!

  const [registerdata, { loading }] = useMutation(REGISTER_USER);

  // *** toast message on error or user successfully register..!!

  const notify = (e) => toast.error(e);
  const notifyInfo = (e) => toast.info(e);

  // *** get values of input fiels..!!

  const getValues = (e) => {
    setRegisterDetails({
      ...registerDetails,
      [e.target.name]: e.target.value,
    });
  };

  if (loading) {
    notifyInfo("Loading..🚀");
  }

  const resetForm = () => {
    ref.current.value = "";
  };

  const submitRegisterForm = (e) => {
    e.preventDefault();

    // ***validate input field so they can't be empty..!!

    if (registerDetails.userName.length === 0) {
      notify("userName can't be empty..!!");
    } else if (registerDetails.phoneno === null) {
      notify("phonenumber can't be empty..!!");
    } else if (registerDetails.email.length === 0) {
      notify("email can't be empty..!!");
    } else if (registerDetails.password.length === 0) {
      notify("password can't be empty..!!");
    } else {
      registerdata({
        variables: {
          input: registerDetails,
        },
      })
        .then((res) => {
          navigate("/");
        })
        .catch((error) => {
          notify(error.message);
        });

      resetForm();
    }
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
        <h2>Register</h2>
        <form onSubmit={submitRegisterForm}>
          <div className="user-box">
            <input
              type="text"
              name="userName"
              ref={ref}
              onChange={getValues}
              autoComplete="off"
            />
            <label>Username</label>
            <div></div>
          </div>
          <div className="user-box">
            <input
              type="tel"
              pattern="[0-9]{10}"
              placeholder="1234567890"
              name="phoneno"
              maxLength={12}
              ref={ref}
              autoComplete="off"
              onChange={getValues}
            />
            <label>phone no</label>
          </div>
          <div className="user-box">
            <input
              type="email"
              name="email"
              autoComplete="off"
              ref={ref}
              onChange={getValues}
            />
            <label>Email </label>
          </div>
          <div className="user-box">
            <input
              type="password"
              name="password"
              autoComplete="off"
              ref={ref}
              onChange={getValues}
            />
            <label>Password</label>
          </div>
          <Link to="/" className="linkTag">
            Already have an account? Login
          </Link>{" "}
          <br />
          <br />
          <Button variant="outlined" color="info" type="submit">
            Submit
          </Button>
        </form>
      </div>
    </>
  );
};

export default Register;
