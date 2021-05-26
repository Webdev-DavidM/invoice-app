import './App.scss';
import React, { useEffect, useState, createContext } from 'react';
import invoicesData from './data.json';
import NavBar from './components/NavBar';
import NewInvoice from './components/NewInvoice';
import Invoice from './components/Invoice';
import EditInvoice from './components/EditInvoice';
import InvoiceHeader from './components/InvoiceHeader';
export const InvoiceContext = createContext();

function App() {
  const [dayTheme, setDayTheme] = useState(true);
  const [invoices, setInvoices] = useState([]);
  const [newInvoice, setNewInvoice] = useState(false);
  const [editInvoice, setEditInvoice] = useState(false);

  useEffect(() => {
    setInvoices(invoicesData);
  }, []);

  const filterInvoices = (filterType) => {};

  // Below will include making the invoice as draft

  const updateInvoice = (id, updatedInvoice) => {};

  const createdInvoice = (id, newInv) => {};

  const deleteInvoice = (id) => {};

  return (
    <div className='App'>
      <InvoiceContext.Provider
        value={{
          invoices,
          filterInvoices,
          dayTheme,
          setDayTheme,
          updateInvoice,
          createdInvoice,
          deleteInvoice,
        }}>
        <div className='main-invoice-container'>
          <NavBar />
          <InvoiceHeader />

          {/*  */}
          {/* Invoices There are */}
          {/* <!-- Add number here --> */}
          {/* total invoices Filter by status Draft Pending Paid New Invoice */}
          {/*  */}
          {/* <!-- No invoices --> */}
          {/* There is nothing here Create an invoice by clicking the New Invoice button */}
          {/* and get started */}
          {/* <!-- No invoices end --> */}
          {/*  */}
          {/* <!-- Create new invoice form --> */}
          {/* Go back New Invoice Bill From Street Address City Post Code Country Bill To */}
          {/* Client's Name Client's Email e.g. email@example.com Street Address City Post */}
          {/* Code Country Invoice Date Payment Terms Net 1 day Net 7 days Net 14 days Net */}
          {/* 30 days Project Description e.g. Graphic Design Service Item List Item Name */}
          {/* Qty. Price Total Add New Item Discard Save as Draft Save & Send */}
          {/* <!-- Create new invoice end --> */}
          {invoices.map((invoice) => (
            <Invoice invoice={invoice} />
          ))}
          <NewInvoice />
          <EditInvoice />
        </div>
      </InvoiceContext.Provider>
    </div>
  );
}

export default App;
