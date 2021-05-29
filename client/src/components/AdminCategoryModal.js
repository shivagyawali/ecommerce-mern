import React, { useState } from "react";
import { showErrorMsg, showSuccessMsg } from "./helpers/message";
import isEmpty from "validator/lib/isEmpty";
import { showLoading } from "./helpers/loading";

//redux
import { useSelector, useDispatch } from "react-redux";
import { clear_messages } from "../redux/actions/messageActions";
import { createCategory } from "../redux/actions/categoryActions";

const AdminCategoryModal = () => {
  const dispatch = useDispatch();

  //Redux global state property
  //from store
  const { successMsg, errorMsg } = useSelector((state) => state.messages);
  const { loading } = useSelector((state) => state.loading);

  const [category, setCategory] = useState("");
  const [errMsg, seterrMsg] = useState("");

  const handleCategoryChange = (e) => {
    dispatch(clear_messages());
    setCategory(e.target.value);
  };

  //clear success and error message when modal close
  const handleMessages = (e) => {
    dispatch(clear_messages());
  };
  const handleCategorySubmit = (e) => {
    e.preventDefault();

    //client side validation(validator)
    if (isEmpty(category)) {
      seterrMsg("Please enter a category");
    } else {
      //success
      const data = { category };
      //request to api

      dispatch(createCategory(data));
      setCategory("");
    }
  };
  return (
    <div id="addCategoryModal" className="modal fade" onClick={handleMessages}>
      <div className="modal-dialog modal-dialog-centered modal-lg">
        <div className="modal-content">
          <form onSubmit={handleCategorySubmit}>
            <div className="modal-header bg-info text-white">
              {errMsg && showErrorMsg(errMsg)}
              {errorMsg && showErrorMsg(errorMsg)}
              {successMsg && showSuccessMsg(successMsg)}

              <h5 className="modal-text">Add Category</h5>
              <button className="close">
                <span>
                  <i
                    className="fas fa-times text-white"
                    data-dismiss="modal"
                  ></i>
                </span>
              </button>
            </div>
            <div className="modal-body my-3">
              {loading ? (
                <div className="text-center"> {showLoading()}</div>
              ) : (
                <>
                  <label className="text-dark">Category Name</label>
                  <input
                    type="text"
                    name="category"
                    value={category}
                    className="form-control"
                    onChange={handleCategoryChange}
                  />
                </>
              )}
            </div>
            <div className="modal-footer">
              <button type="submit" className="btn btn-success">
                Save
              </button>
              <button className="btn btn-danger" data-dismiss="modal">
                Close
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminCategoryModal;
