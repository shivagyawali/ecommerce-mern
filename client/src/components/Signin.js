import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import isEmail from "validator/lib/isEmail";
import isEmpty from "validator/lib/isEmpty";
import { showErrorMsg } from "./helpers/message";
import { showLoading } from "./helpers/loading";
import { signin } from "../api/auth";
import { isAuthenticated, setAuthentication } from "./helpers/auth";
const Signin = () => {
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
    email: "",
    password: "",
    errorMsg: false,
    loading: false,
  });

  const { email, password, errorMsg, loading } = formData;
  /**************** Event Handler ******************/
  const handleChange = (e) => {
    setformData({
      ...formData,
      [e.target.name]: e.target.value,
      //when start typing reset msg to empty string
      errorMsg: "",
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    //client side validation(validator)
    if (isEmpty(email) || isEmpty(password)) {
      setformData({
        ...formData,
        errorMsg: "All fields are required",
      });
    } else if (!isEmail(email)) {
      setformData({
        ...formData,
        errorMsg: "Invalid Email",
      });
    } else {
      //success
      const { email, password } = formData;
      const data = { email, password };
      setformData({ ...formData, loading: true });

      //request to api
      signin(data)
        .then((response) => {
          console.log("Signin success");
          //get token and user info
          setAuthentication(response.data.token, response.data.user);

          //redirection
          if (isAuthenticated() && isAuthenticated().role === 1) {
            // console.log("Redirect to admin");
            history.push("/admin/dashboard");
          } else {
            // console.log("Redirect to user dashboard");
            history.push("/user/dashboard");
          }
        })
        .catch((err) => {
          // console.log("Axios signin error: ", err);
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
  const showSigninForm = () => (
    <form className="signin-form" onSubmit={handleSubmit} noValidate>
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

      <div className="form-group">
        <button type="submit" className="btn btn-danger btn-block">
          Signin
        </button>
      </div>
      <p className="text-center text-dark font-weight-bold">
        No account ?<Link to="/signup"> Register Here </Link>
      </p>
    </form>
  );
  /********* RENDER ***********/
  return (
    <>
      {errorMsg && showErrorMsg(errorMsg)}
      <div id="signin-container">
        <div id="signin-img"></div>
        <div className="row px-5 vh-100 ">
          <div className="col-md-5 mx-auto align-self-center">
            <h1 className="text-center text-dark font-weight-bold">
              User Login
            </h1>
            <div className="text-center p-4 ">{loading && showLoading()}</div>
            {showSigninForm()}
            {/* {JSON.stringify(formData)} */}
          </div>
        </div>
      </div>
    </>
  );
};

export default Signin;
