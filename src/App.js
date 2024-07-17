import React from "react";
import AuthProvider from "./contexts/AuthContext";
import ProductProvider from "./contexts/ProductContext";
import InvoiceProvider from "./contexts/InvoiceContext";
import Navbar from "./components/Navbar";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import ProductList from "./components/Products/ProductList";
import { Route, Routes } from "react-router-dom";
import ProductDetail from "./components/Products/ProductDetail";
import Inventory from "./components/Inventory";
import Invoice from "./components/Invoice";

const App = () => {
  return (
    <>
      <AuthProvider>
        <ProductProvider>
          <InvoiceProvider>
            <Navbar />
            <Routes>
              <Route path="/" element={<ProductList></ProductList>} />
              <Route path="/login" element={<Login></Login>} />
              <Route path="/register" element={<Register></Register>} />
              <Route path="/products" element={<ProductList></ProductList>} />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="/inventory" element={<Inventory />} />
              <Route path="/invoice" element={<Invoice />} />
            </Routes>
          </InvoiceProvider>
        </ProductProvider>
      </AuthProvider>
    </>
  );
};

export default App;
