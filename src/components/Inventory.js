import React, { useContext } from "react";
import { ProductContext } from "../contexts/ProductContext";
import { InvoiceContext } from "../contexts/InvoiceContext";
import { Link, useNavigate } from "react-router-dom";

const Inventory = () => {
  const { inventory, removeFromInventory, updateQuantity, clearInventory } =
    useContext(ProductContext);
  const { createInvoice } = useContext(InvoiceContext);
  const navigate = useNavigate();

  const handleQuantityChange = (id, quantity) => {
    updateQuantity(id, quantity);
  };

  const increaseQuantity = (id, currentQuantity) => {
    handleQuantityChange(id, currentQuantity + 1);
  };

  const decreaseQuantity = (id, currentQuantity) => {
    if (currentQuantity > 1) {
      handleQuantityChange(id, currentQuantity - 1);
    }
  };

  const calculateTotal = () => {
    return inventory
      .reduce((acc, item) => acc + item.price * item.quantity, 0)
      .toFixed(2);
  };

  const handleBuyNow = () => {
    const invoiceData = {
      items: inventory,
      total: calculateTotal(),
      date: new Date().toLocaleString(),
      due: true, // Add a 'due' field to the invoice data
    };
    createInvoice(invoiceData);
    clearInventory(); // Clear the inventory after creating the invoice
    navigate("/invoice");
  };

  return (
    <div className="min-h-screen p-4 bg-gray-100">
      <h1 className="text-3xl font-bold text-center mb-8">Shopping Cart</h1>
      {inventory.length === 0 ? (
        <p className="text-center text-xl text-gray-700">
          Your inventory is empty.{" "}
          <Link to="/products" className="text-blue-500 hover:underline">
            Continue Shopping
          </Link>
        </p>
      ) : (
        <div className="overflow-x-auto lg:mx-8 xl:mx-16">
          <table className="w-full bg-white shadow-md rounded-lg mx-auto">
            <thead>
              <tr>
                <th className="px-4 py-2 bg-gray-100 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider md:table-cell">
                  Image
                </th>
                <th className="px-4 py-2 bg-gray-100 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">
                  Product Name
                </th>
                <th className="px-4 py-2 bg-gray-100 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider lg:table-cell">
                  Category
                </th>
                <th className="px-4 py-2 bg-gray-100 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">
                  Quantity
                </th>
                <th className="px-4 py-2 bg-gray-100 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider md:table-cell">
                  Unit Price
                </th>
                <th className="px-4 py-2 bg-gray-100 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">
                  Total
                </th>
                <th className="px-4 py-2 bg-gray-100 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {inventory.map((item, index) => (
                <tr
                  key={index}
                  className="hover:bg-gray-50 transition duration-150 ease-in-out"
                >
                  <td className="px-4 py-2">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-16 h-16 object-contain"
                    />
                  </td>
                  <td className="px-4 py-2">{item.title}</td>
                  <td className="px-4 py-2">{item.category}</td>
                  <td className="px-4 py-2">
                    <div className="flex items-center">
                      <button
                        onClick={() => decreaseQuantity(item.id, item.quantity)}
                        className="px-2 py-1 bg-gray-200 border border-gray-300 rounded-l hover:bg-gray-300"
                      >
                        -
                      </button>
                      <input
                        type="number"
                        className="w-12 px-2 py-1 border-t border-b border-gray-300 text-center"
                        value={item.quantity}
                        readOnly
                      />
                      <button
                        onClick={() => increaseQuantity(item.id, item.quantity)}
                        className="px-2 py-1 bg-gray-200 border border-gray-300 rounded-r hover:bg-gray-300"
                      >
                        +
                      </button>
                    </div>
                  </td>
                  <td className="px-4 py-2">${item.price.toFixed(2)}</td>
                  <td className="px-4 py-2">
                    ${(item.price * item.quantity).toFixed(2)}
                  </td>
                  <td className="px-4 py-2">
                    <button
                      onClick={() => removeFromInventory(item.id)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition duration-300"
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td
                  colSpan="5"
                  className="px-4 py-2 text-right font-bold text-xl border-t border-gray-300"
                >
                  Total:
                </td>
                <td className="px-4 py-2 text-left font-bold text-xl border-t border-gray-300">
                  ${calculateTotal()}
                </td>
                <td className="px-4 py-2 border-t border-gray-300"></td>
              </tr>
              <tr>
                <td colSpan="7" className="px-4 xl:pr-7 py-2 text-right">
                  <button
                    onClick={handleBuyNow}
                    className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition duration-300"
                  >
                    Buy Now
                  </button>
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      )}
    </div>
  );
};

export default Inventory;
