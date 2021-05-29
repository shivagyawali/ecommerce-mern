import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import isEmail from "validator/lib/isEmail";
import isEmpty from "validator/lib/isEmpty";
import equals from "validator/lib/equals";
import { showErrorMsg, showSuccessMsg } from "./helpers/message";
import { showLoading } from "./helpers/loading";
import { signup } from "../api/auth";
import { isAuthenticated } from "./helpers/auth";
const Signup = () => {
  let history = useHistory();

  useEffect(() => {
    //redirection
    if (isAuthenticated() && isAuthenticated().role === 1) {
      // console.log("Redirect to admin");
      history.push("/admin/dashboard");
    } else if (isAuthenticated() && isAuthenticated().role === 0) {
      // console.log("Redirect to user dashboard");
      history.push("/user/dashboard");
    }
  }, [history]);
  const [formData, setformData] = useState({
    username: "",
    email: "",
    password: "",
    password2: "",
    successMsg: false,
    errorMsg: false,
    loading: false,
  });
  const {
    username,
    email,
    password,
    password2,
    successMsg,
    errorMsg,
    loading,
  } = formData;
  /**************** Event Handler ******************/
  const handleChange = (e) => {
    setformData({
      ...formData,
      [e.target.name]: e.target.value,
      //when start typing reset msg to empty string
      successMsg: "",
      errorMsg: "",
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    //client side validation(validator)
    if (
      isEmpty(username) ||
      isEmpty(email) ||
      isEmpty(password) ||
      isEmpty(password2)
    ) {
      setformData({
        ...formData,
        errorMsg: "All fields are required",
      });
    } else if (!isEmail(email)) {
      setformData({
        ...formData,
        errorMsg: "Invalid Email",
      });
    } else if (!equals(password, password2)) {
      setformData({
        ...formData,
        errorMsg: "Passwords do not match",
      });
    } else {
      //success
      const { username, email, password } = formData;
      const data = { username, email, password };
      setformData({ ...formData, loading: true });

      //request to api
      signup(data)
        .then((response) => {
          console.log("Signup success");
          setformData({
            username: "",
            email: "",
            password: "",
            password2: "",
            loading: false,
            successMsg: response.data.successMessage,
          });
        })
        .catch((err) => {
          console.log("Axios signup error: ", err);
          setformData({
            ...formData,
            loading: false,
            errorMsg: err.response.data.errorMessage,
          });
        });
    }
    // console.log(formData);
  };
  /*************** VIEWS **************/
  const showSignupForm = () => (
    <form className="signup-form" onSubmit={handleSubmit} noValidate>
      <div className="form-group input-group">
        <div className="input-group-prepend">
          <span className="input-group-text">
            <i className="fa fa-user"></i>
          </span>
        </div>
        <input
          type="text"
          name="username"
          value={username}
          className="form-control"
          placeholder="Username"
          onChange={handleChange}
        />
      </div>
      <div className="form-group input-group">
        <div className="input-group-prepend">
          <span className="input-group-text">
            <i className="fa fa-envelope"></i>
          </span>
        </div>
        <input
          type="email"
          name="email"
          value={email}
          className="form-control"
          placeholder="Email Address"
          onChange={handleChange}
        />
      </div>
      <div className="form-group input-group">
        <div className="input-group-prepend">
          <span className="input-group-text">
            <i className="fa fa-lock"></i>
          </span>
        </div>
        <input
          type="password"
          name="password"
          value={password}
          className="form-control"
          placeholder="Password"
          onChange={handleChange}
        />
      </div>
      <div className="form-group input-group">
        <div className="input-group-prepend">
          <span className="input-group-text">
            <i className="fa fa-lock"></i>
          </span>
        </div>
        <input
          type="password"
          name="password2"
          value={password2}
          className="form-control"
          placeholder="Confirm Password"
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <button type="submit" className="btn btn-primary btn-block">
          Signup
        </button>
      </div>
      <p className="text-center text-dark font-weight-bold">
        Already have an account ?
        <Link to="/signin" className="text-light">
          {" "}
          Login{" "}
        </Link>
      </p>
    </form>
  );
  /********* RENDER ***********/
  return (
    <>
      {errorMsg && showErrorMsg(errorMsg)}
      {successMsg && showSuccessMsg(successMsg)}
      <div id="signup-contain">
        <div id="signup-img"></div>

        <div className="row px-3 vh-100">
          <div className="col-md-5 mx-auto align-self-center">
            <h1 className="text-center font-weight-bold">User Registration</h1>

            <div className="text-center p-4 ">{loading && showLoading()}</div>
            {showSignupForm()}
            {/* {JSON.stringify(formData)} */}
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
