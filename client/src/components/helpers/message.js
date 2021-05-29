import React from "react";
export const showErrorMsg = (msg) => (
  <div
    className="alert alert-danger font-weight-bold"
    id="notification"
    role="alert"
  >
    {msg}
  </div>
);
export const showSuccessMsg = (msg) => (
  <div
    className="alert alert-success font-weight-bold"
    id="notification"
    role="alert"
  >
    {msg}
  </div>
);
