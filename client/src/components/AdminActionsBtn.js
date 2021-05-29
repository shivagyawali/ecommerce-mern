import React from "react";

const AdminActionsBtn = () => (
  <div className="bg-light my-2">
    <div className="container">
      <div className="row pb-4">
        <div className="col-md-4 my-1">
          <button
            className=" btn btn-info btn-block"
            data-toggle="modal"
            data-target="#addCategoryModal"
          >
            <i className="fas fa-plus">Add Category</i>
          </button>
        </div>
        <div className="col-md-4 my-1">
          <button
            className=" btn btn-warning btn-block"
            data-toggle="modal"
            data-target="#addFoodModal"
          >
            <i className="fas fa-plus"> Add Food</i>
          </button>
        </div>
        <div className="col-md-4 my-1">
          <button className=" btn btn-success btn-block">
            <i className="fas fa-money-check"> View Orders</i>
          </button>
        </div>
      </div>
    </div>
  </div>
);
export default AdminActionsBtn;
