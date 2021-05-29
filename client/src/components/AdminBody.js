import React from "react";

//redux
import { useSelector } from "react-redux";
import ProductCard from "./ProductCard";

const AdminBody = () => {
  //Redux global state property
  //from store
  const { products } = useSelector((state) => state.products);

  return (
    <div className="container">
      <div className="row ">
        {products &&
          products.map((product) => <ProductCard product={product} />)}
      </div>
    </div>
  );
};

export default AdminBody;
