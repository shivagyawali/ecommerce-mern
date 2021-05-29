import React, { Fragment, useEffect, useState } from "react";
import { showErrorMsg, showSuccessMsg } from "./helpers/message";
import { showLoading } from "./helpers/loading";
import { Link } from "react-router-dom";
import axios from "axios";

//redux
import { useSelector, useDispatch } from "react-redux";
import { getProduct } from "../redux/actions/productActions";
import { getCategories } from "../redux/actions/categoryActions";

const AdminEditProduct = ({ match, history }) => {
  const dispatch = useDispatch();
  const productId = match.params.productId;
  const { product } = useSelector((state) => state.products);
  const { categories } = useSelector((state) => state.categories);
  /****************************
   * COMPONENT STATE PROPERTIES
   ***************************/
  const [productImage, setProductImage] = useState(null);
  const [productName, setProductName] = useState("");
  const [productDesc, setProductDesc] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productCategory, setProductCategory] = useState("");
  const [productQty, setProductQty] = useState("");
  const [clientSideError, setClientSideError] = useState("");

  /****************************
   * LIFECYCLE METHODS
   ***************************/
  useEffect(() => {
    if (!product) {
      dispatch(getCategories());
      dispatch(getProduct(productId));
    } else {
      setProductImage(product.fileName);
      setProductName(product.productName);
      setProductDesc(product.productDesc);
      setProductPrice(product.productPrice);
      setProductCategory(product.productCategory);
      setProductQty(product.productQty);
    }
  }, [dispatch, productId, product]);

  //redux global state
  //from store
  const { successMsg, errorMsg } = useSelector((state) => state.messages);
  const { loading } = useSelector((state) => state.loading);

  /****************************
   * EVENT HANDLERS
   ***************************/

  const handleImageUpload = (e) => {
    const image = e.target.files[0];
    setProductImage(image);
  };
  const handleProductSubmit = async (e) => {
    e.preventDefault();
    if (productImage === null || productImage === "") {
      setClientSideError("Please select an image");
    } else {
      const formData = new FormData();
      formData.append("productImage", productImage);
      formData.append("productName", productName);
      formData.append("productDesc", productDesc);
      formData.append("productPrice", productPrice);
      formData.append("productCategory", productCategory);
      formData.append("productQty", productQty);

      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      await axios
        .put(`/api/product/${productId}`, formData, config)
        .then((res) => {
          history.push("/admin/dashboard");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <div className="container">
      <div className="modal-content">
        <form onSubmit={handleProductSubmit}>
          <div className="modal-header bg-warning text-dark">
            {clientSideError && showErrorMsg(clientSideError)}
            {errorMsg && showErrorMsg(errorMsg)}
            {successMsg && showSuccessMsg(successMsg)}

            <h5 className="modal-text">
              <Link to="/admin/dashboard" className="btn btn-success">
                <span className="bn btn-success fas fa-arrow-left">
                  &nbsp; Go Back
                </span>
              </Link>
            </h5>
          </div>
          <div className="modal-body my-3">
            {loading ? (
              <div className="text-center"> {showLoading()}</div>
            ) : (
              <Fragment>
                <div className="form-group mb-3 mt-5">
                  <input
                    type="file"
                    className="form-control "
                    name="productImage"
                    onChange={handleImageUpload}
                    required
                  />
                  {productImage && productImage.name ? (
                    <span className="badge badge-secondary">
                      {productImage.name}
                    </span>
                  ) : productImage ? (
                    <img
                      className="img-thumbnail mt-4"
                      style={{
                        width: "150px",
                        height: "100px",
                      }}
                      src={`/uploads/${productImage}`}
                      alt="product"
                    />
                  ) : null}
                </div>
                <div className="form-group mt-4">
                  <label className="text-secondary"> Food Name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="productName"
                    value={productName}
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
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
                    onChange={(e) => setProductDesc(e.target.value)}
                  ></textarea>
                </div>
                <div className="form-group">
                  <label className="text-secondary"> Price</label>
                  <input
                    type="text"
                    name="productPrice"
                    value={productPrice}
                    onChange={(e) => setProductPrice(e.target.value)}
                    className="form-control"
                  />
                </div>
                <div className="form-row">
                  <div className="form-group col-md-4">
                    <label className="text-secondary"> Category</label>
                    <select
                      className="form-control custom-select mr-sm-2 form-select"
                      name="productCategory"
                      defaultValue={productCategory._id}
                      onChange={(e) => setProductCategory(e.target.value)}
                    >
                      <option>Choose Category</option>
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
                      onChange={(e) => setProductQty(e.target.value)}
                    />
                  </div>
                </div>
              </Fragment>
            )}
          </div>
          <div className="modal-footer">
            <button type="submit" className="btn btn-warning">
              Update
            </button>
            <button className="btn btn-danger" data-dismiss="modal">
              Close
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminEditProduct;
