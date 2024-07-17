import React from "react";
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col justify-between h-112 transform hover:-translate-y-1 hover:scale-105 transition-transform">
      <div className="flex flex-col items-center mb-4">
        <div className="w-full h-48 flex items-center justify-center rounded-lg mb-4 overflow-hidden">
          <img
            src={product.image}
            alt={product.title}
            className="object-contain w-full h-full rounded-lg hover:scale-110 transition-transform duration-300"
          />
        </div>
        <h2 className="text-xl font-bold text-gray-800 mb-2 text-center line-clamp-4 overflow-hidden h-20">
          {product.title}
        </h2>
        <p className="text-lg text-green-600 font-semibold mb-2">
          ${product.price}
        </p>
      </div>
      <Link
        to={`/product/${product.id}`}
        className="mt-auto inline-block w-full bg-gradient-to-r from-blue-400 to-blue-600 text-white py-2 px-4 rounded-full text-center font-medium hover:from-blue-500 hover:to-blue-700 transition duration-300"
      >
        View Details
      </Link>
    </div>
  );
};

export default ProductCard;
