// InvoiceContext.js
import React, { createContext, useContext, useReducer } from "react";

const InvoiceContext = createContext();

const initialState = {
  invoiceNumber: 1,
};

const invoiceReducer = (state, action) => {
  switch (action.type) {
    case "GENERATE_NEW_INVOICE":
      return {
        ...state,
        invoiceNumber: state.invoiceNumber + 1,
      };
    default:
      return state;
  }
};

const InvoiceProvider = ({ children }) => {
  const [state, dispatch] = useReducer(invoiceReducer, initialState);

  return (
    <InvoiceContext.Provider value={{ state, dispatch }}>
      {children}
    </InvoiceContext.Provider>
  );
};

const useInvoice = () => {
  const context = useContext(InvoiceContext);
  if (!context) {
    throw new Error("useInvoice must be used within an InvoiceProvider");
  }
  return context;
};

export { InvoiceProvider, useInvoice };
