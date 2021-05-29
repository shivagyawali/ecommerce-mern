import React from "react";
import { Link, withRouter } from "react-router-dom";
import { isAuthenticated, logout } from "./helpers/auth";

const Header = ({ history }) => {
  const handleLogout = (e) => {
    logout(() => {
      history.push("/signin");
    });
  };
  const showNavigation = () => (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <Link className="navbar-brand" to="/">
        Gs-At Home
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarTogglerDemo02"
        aria-controls="navbarTogglerDemo02"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon" />
      </button>
      <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
        <ul className="navbar-nav ml-auto mt-2 mt-lg-0">
          <li className="nav-item">
            <Link className="nav-link" to="/">
              Home
            </Link>
          </li>
          {!isAuthenticated() && (
            <>
              <li className="nav-item ">
                <Link className="nav-link" to="/signup">
                  Signup <span className="sr-only">(current)</span>
                </Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link" to="/signin">
                  Signin
                </Link>
              </li>
            </>
          )}

          {isAuthenticated() && isAuthenticated().role === 0 && (
            <>
              <li className="nav-item ">
                <Link className="nav-link" to="/signup">
                  User Profile <span className="sr-only">(current)</span>
                </Link>
              </li>
            </>
          )}
          {isAuthenticated() && isAuthenticated().role === 1 && (
            <>
              <li className="nav-item ">
                <Link className="nav-link" to="/signup">
                  Admin Profile <span className="sr-only">(current)</span>
                </Link>
              </li>
            </>
          )}
          {isAuthenticated() && (
            <>
              <li className="nav-item ">
                <button
                  className="nav-link btn btn-danger text-light"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );

  return <header id="header">{showNavigation()}</header>;
};

export default withRouter(Header);
