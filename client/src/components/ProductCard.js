import React from "react";
import { Link } from "react-router-dom";

// redux
import { useDispatch } from "react-redux";
import { deleteProduct } from "../redux/actions/productActions";
const ProductCard = ({ product }) => {
  const dispatch = useDispatch();

  return (
    <div className="col-sm-4">
      <div className="productContainer">
        <div className="product-image ">
          <img
            src={`/uploads/${product.fileName}`}
            className="product-image "
          />
        </div>
        <div className="product-content">
          <div className="product-review">
            <div className="product-stars">
              <span>Review</span>
              <i className="fa fa-star" aria-hidden="true"></i>
              <i className="fa fa-star" aria-hidden="true"></i>
              <i className="fa fa-star" aria-hidden="true"></i>
              <i className="fa fa-star" aria-hidden="true"></i>
            </div>
            <h4>Rs. {product.productPrice}</h4>
          </div>
          <h4 className="product-name">{product.productName}</h4>
          <div className="product-detail">
            <p>
              {product.productDesc.length > 60
                ? product.productDesc.substring(0, 60) + "..."
                : product.productDesc.substring(0, 60)}
            </p>
            <p className="font-weight-bold">
              {product.productCategory.category}
            </p>
          </div>
          <div className="btn-box">
            <Link
              to={`/admin/edit/product/${product._id}`}
              className="btn btn-sm  btn-warning"
            >
              <i className="far fa-edit pr-1"></i>
              Edit
            </Link>
            <button
              className=" btn-sm btn btn-danger"
              onClick={() => dispatch(deleteProduct(product._id))}
            >
              <i className="fa fa-trash pr-1"></i>
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
