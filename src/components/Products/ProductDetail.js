import React, { useContext, useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { ProductContext } from "../../contexts/ProductContext";

const ProductDetail = () => {
  const { id } = useParams();
  const { products, addToInventory } = useContext(ProductContext);
  const [product, setProduct] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    const foundProduct = products.find((p) => p.id === parseInt(id));
    setProduct(foundProduct);
  }, [id, products]);

  const handleAddToInventory = () => {
    addToInventory(product, quantity);
    setShowModal(true);
  };

  const increaseQuantity = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const decreaseQuantity = () => {
    setQuantity((prevQuantity) => (prevQuantity > 1 ? prevQuantity - 1 : 1));
  };

  if (!product) return <div>Loading...</div>;

  return (
    <div className="mx-auto p-4 min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-4xl mb-4">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 w-full mb-4 md:mb-0">
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-64 object-contain rounded-lg shadow-lg"
            />
          </div>
          <div className="md:w-1/2 w-full md:pl-8">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">
              {product.title}
            </h1>
            <p className="text-xl text-green-600 font-semibold mb-4">
              ${product.price}
            </p>
            <p className="text-gray-700 mb-4">{product.description}</p>
            <p className="text-gray-600 mb-2">
              <strong>Category:</strong> {product.category}
            </p>
            <p className="text-gray-600 mb-2">
              <strong>Rating:</strong> {product.rating.rate} (
              {product.rating.count} reviews)
            </p>
            <div className="flex items-center mb-4 space-x-2">
              <button
                onClick={decreaseQuantity}
                className="bg-gray-300 text-gray-800 py-2 px-4 rounded-l hover:bg-gray-400 transition duration-300"
              >
                -
              </button>
              <span className="bg-gray-100 text-gray-800 py-2 px-4">
                {quantity}
              </span>
              <button
                onClick={increaseQuantity}
                className="bg-gray-300 text-gray-800 py-2 px-4 rounded-r hover:bg-gray-400 transition duration-300"
              >
                +
              </button>
              <button
                onClick={handleAddToInventory}
                className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300 font-medium ml-4"
              >
                Add to Inventory
              </button>
            </div>
          </div>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-2xl"
            >
              &times;
            </button>
            <p className="text-gray-700 mb-4">
              You have added <strong>{quantity}</strong> of{" "}
              <strong>{product.title}</strong> to your inventory.
            </p>
            <div className="flex justify-between">
              <Link
                to="/inventory"
                className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300"
              >
                View Inventory
              </Link>
              <button
                onClick={() => {
                  setShowModal(false);
                  navigate("/products");
                }}
                className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600 transition duration-300"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetail;
