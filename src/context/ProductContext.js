import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const ProductContext = createContext();

const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [inventory, setInventory] = useState([]);

  useEffect(() => {
    axios
      .get("https://fakestoreapi.com/products")
      .then((response) => setProducts(response.data))
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  const addToInventory = (product) => {
    const existingProduct = inventory.find((item) => item.id === product.id);
    if (existingProduct) {
      setInventory(
        inventory.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setInventory([...inventory, { ...product, quantity: 1 }]);
    }
  };

  const removeFromInventory = (id) => {
    setInventory(inventory.filter((product) => product.id !== id));
  };

  const updateQuantity = (id, quantity) => {
    setInventory(
      inventory.map((item) =>
        item.id === id ? { ...item, quantity: parseInt(quantity) } : item
      )
    );
  };

  const clearInventory = () => {
    setInventory([]);
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        inventory,
        addToInventory,
        removeFromInventory,
        updateQuantity,
        clearInventory,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export default ProductProvider;
