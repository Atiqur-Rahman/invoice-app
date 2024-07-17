import React, { useContext, useRef } from "react";
import { InvoiceContext } from "../contexts/InvoiceContext";
import { Link } from "react-router-dom";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const Invoice = () => {
  const { invoice } = useContext(InvoiceContext);
  const invoiceRef = useRef();

  if (!invoice) {
    return (
      <p className="text-center text-xl text-gray-700">
        No invoice data available.{" "}
        <Link to="/inventory" className="text-blue-500 hover:underline">
          Go back to Inventory
        </Link>
      </p>
    );
  }

  const downloadInvoice = () => {
    const input = invoiceRef.current;

    html2canvas(input, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const imgWidth = 210;
      const pageHeight = 297;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      pdf.save(`invoice_${new Date().toISOString()}.pdf`);
    });
  };

  return (
    <>
      <div className="min-h-screen p-4 bg-gray-100">
        <h1 className="text-3xl font-bold text-center mb-8">Invoice</h1>
        <div
          id="invoice"
          ref={invoiceRef}
          className="mt-8 p-4 bg-white shadow-md rounded-lg mx-auto"
        >
          <h2 className="text-2xl font-bold mb-4">Invoice Details</h2>
          <p className="mb-2">Date: {invoice.date}</p>
          <table className="w-full bg-gray-100 shadow-md rounded-lg mx-auto mb-4">
            <thead>
              <tr>
                <th className="px-4 py-2 bg-gray-200 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">
                  Product Name
                </th>
                <th className="px-4 py-2 bg-gray-200 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">
                  Quantity
                </th>
                <th className="px-4 py-2 bg-gray-200 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">
                  Unit Price
                </th>
                <th className="px-4 py-2 bg-gray-200 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">
                  Total
                </th>
              </tr>
            </thead>
            <tbody>
              {invoice.items.map((item, index) => (
                <tr key={index}>
                  <td className="px-4 py-2">{item.title}</td>
                  <td className="px-4 py-2">{item.quantity}</td>
                  <td className="px-4 py-2">${item.price.toFixed(2)}</td>
                  <td className="px-4 py-2">
                    ${(item.price * item.quantity).toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td
                  colSpan="3"
                  className="px-4 py-2 text-right font-bold text-xl border-t border-gray-300"
                >
                  Total:
                </td>
                <td className="px-4 py-2 text-left font-bold text-xl border-t border-gray-300">
                  ${invoice.total}
                </td>
              </tr>
              {invoice.due && (
                <tr>
                  <td
                    colSpan="3"
                    className="px-4 py-2 text-right font-bold text-xl border-t border-gray-300"
                  >
                    Due:
                  </td>
                  <td className="px-4 py-2 text-left font-bold text-xl border-t border-gray-300">
                    ${invoice.total}
                  </td>
                </tr>
              )}
            </tfoot>
          </table>
        </div>
        <div className="flex justify-center mt-4">
          <button
            onClick={downloadInvoice}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition duration-300 mr-4"
          >
            Download Invoice
          </button>
          <Link
            to="/inventory"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300"
          >
            Back to Inventory
          </Link>
        </div>
      </div>
    </>
  );
};

export default Invoice;
