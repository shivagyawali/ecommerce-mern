import React, { Fragment, useState } from "react";
import isEmpty from "validator/lib/isEmpty";
import { showErrorMsg, showSuccessMsg } from "./helpers/message";
import { showLoading } from "./helpers/loading";

//redux
import { useSelector, useDispatch } from "react-redux";
import { clear_messages } from "../redux/actions/messageActions";
import { createProduct } from "../redux/actions/productActions";

const AdminProductModal = () => {
  const dispatch = useDispatch();

  //redux global state
  //from store
  const { successMsg, errorMsg } = useSelector((state) => state.messages);
  const { loading } = useSelector((state) => state.loading);
  const { categories } = useSelector((state) => state.categories);

  //
  const [clientSideError, setClientSideError] = useState("");

  const [productData, setProductData] = useState({
    productImage: null,
    productName: "",
    productDesc: "",
    productPrice: "",
    productCategory: "",
    productQty: "",
  });

  const {
    productImage,
    productName,
    productDesc,
    productPrice,
    productCategory,
    productQty,
  } = productData;
  /****************************
   * EVENT HANDLERS
   ***************************/
  const handleMessages = (evt) => {
    dispatch(clear_messages());
    setClientSideError("");
  };
  /****** on typing food item *****/
  const handleProductImage = (e) => {
    setProductData({
      ...productData,
      [e.target.name]: e.target.files[0],
    });
  };
  const handleProductChange = (e) => {
    setProductData({
      ...productData,
      [e.target.name]: e.target.value,
    });
  };
  const handleProductSubmit = (evt) => {
    evt.preventDefault();

    if (productImage === null) {
      setClientSideError("Please select an image");
    } else if (
      isEmpty(productName) ||
      isEmpty(productDesc) ||
      isEmpty(productPrice)
    ) {
      setClientSideError("Please enter all fields");
    } else if (isEmpty(productCategory)) {
      setClientSideError("Please select a category");
    } else if (isEmpty(productQty)) {
      setClientSideError("Please select a quantity");
    } else {
      let formData = new FormData();

      formData.append("productImage", productImage);
      formData.append("productName", productName);
      formData.append("productDesc", productDesc);
      formData.append("productPrice", productPrice);
      formData.append("productCategory", productCategory);
      formData.append("productQty", productQty);

      dispatch(createProduct(formData));
      setProductData({
        productImage: null,
        productName: "",
        productDesc: "",
        productPrice: "",
        productCategory: "",
        productQty: "",
      });
    }
  };

  return (
    <div id="addFoodModal" className="modal fade" onClick={handleMessages}>
      <div className="modal-dialog modal-dialog-centered modal-lg">
        <div className="modal-content">
          <form onSubmit={handleProductSubmit}>
            <div className="modal-header bg-warning text-dark">
              {clientSideError && showErrorMsg(clientSideError)}
              {errorMsg && showErrorMsg(errorMsg)}
              {successMsg && showSuccessMsg(successMsg)}

              <h5 className="modal-text">Add Food</h5>
              <button className="close">
                <span>
                  <i
                    className="fas fa-times text-dark"
                    data-dismiss="modal"
                  ></i>
                </span>
              </button>
            </div>
            <div className="modal-body my-3">
              {loading ? (
                <div className="text-center"> {showLoading()}</div>
              ) : (
                <Fragment>
                  <div className="form-group mb-3">
                    <input
                      type="file"
                      className="form-control "
                      name="productImage"
                      onChange={handleProductImage}
                    />
                  </div>
                  <div className="form-group mt-4">
                    <label className="text-secondary"> Food Name</label>
                    <input
                      type="text"
                      className="form-control"
                      name="productName"
                      value={productName}
                      onChange={handleProductChange}
                    />
                  </div>
                  <div className="form-group">
                    <label className="text-secondary"> Description</label>
                    <textarea
                      type="text"
                      rows="4"
                      className="form-control"
                      name="productDesc"
                      value={productDesc}
                      onChange={handleProductChange}
                    ></textarea>
                  </div>
                  <div className="form-group">
                    <label className="text-secondary"> Price</label>
                    <input
                      type="text"
                      name="productPrice"
                      value={productPrice}
                      onChange={handleProductChange}
                      className="form-control"
                    />
                  </div>
                  <div className="form-row">
                    <div className="form-group col-md-4">
                      <label className="text-secondary"> Category</label>

                      <select
                        className="form-control custom-select mr-sm-2"
                        name="productCategory"
                        onChange={handleProductChange}
                      >
                        <option value="">Choose one..</option>
                        {categories &&
                          categories.map((c) => (
                            <option key={c._id} value={c._id}>
                              {c.category}
                            </option>
                          ))}
                      </select>
                    </div>
                    <div className="form-group col-md-4">
                      <label className="text-secondary"> Quantity</label>
                      <input
                        type="number"
                        min="1"
                        max="100"
                        className="form-control"
                        name="productQty"
                        value={productQty}
                        onChange={handleProductChange}
                      />
                    </div>
                  </div>
                </Fragment>
              )}
            </div>
            <div className="modal-footer">
              <button type="submit" className="btn btn-warning">
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

export default AdminProductModal;
