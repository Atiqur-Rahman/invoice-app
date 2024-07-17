import React, { createContext, useState } from "react";

export const InvoiceContext = createContext();

const InvoiceProvider = ({ children }) => {
  const [invoice, setInvoice] = useState(null);

  const createInvoice = (invoiceData) => {
    setInvoice(invoiceData);
  };

  return (
    <InvoiceContext.Provider value={{ invoice, createInvoice }}>
      {children}
    </InvoiceContext.Provider>
  );
};

export default InvoiceProvider;
