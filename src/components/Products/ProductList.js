import React from "react";
import { ProductContext } from "../../contexts/ProductContext";
import ProductCard from "./ProductCard";

const ProductList = () => {
  const { products } = React.useContext(ProductContext);

  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductList;
