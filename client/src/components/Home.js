import React, { useEffect } from "react";
import { Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getProducts } from "../redux/actions/productActions";

const Home = () => {
  const dispatch = useDispatch();

  const { products } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  return (
    <Fragment>
      <div className="jumbotron jumbotron-fluid">
        <div className="container">
          <h1 className="display-4">Goods and Services at home</h1>
          <p className="lead">
            This is a modified jumbotron that occupies the entire horizontal
            space of its parent.
          </p>
        </div>
      </div>

      <ul className="nav nav-tabs container centered" role="tablist">
        <li className="nav-item ">
          <a
            className="nav-link active"
            data-toggle="tab"
            href="#tabs-1"
            role="tab"
          >
            Goods
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" data-toggle="tab" href="#tabs-2" role="tab">
            Services
          </a>
        </li>
      </ul>
      {/* Tab panes */}
      <div className="tab-content container mt ">
        <div className="tab-pane active" id="tabs-1" role="tabpanel">
          <div className="row mt-5">
            {products &&
              products.map((product) => (
                <div className="col-sm-4" key={product._id}>
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
                      </div>
                      <div className="btn-box">
                        <span className="like">
                          <i className="fa fa-heart" aria-hidden="true"></i>
                        </span>
                        <div className="btnProduct">
                          <p className="add-to-cart">Add to cart</p>
                          <div className="cart-icon">
                            <i
                              className="fa fa-shopping-cart"
                              aria-hidden="true"
                            ></i>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
        <div className="tab-pane" id="tabs-2" role="tabpanel">
          <p>Second Panel</p>
        </div>
        <div className="tab-pane" id="tabs-3" role="tabpanel">
          <p>Third Panel</p>
        </div>
      </div>
    </Fragment>
  );
};

export default Home;
