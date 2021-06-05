import './App.scss';
import React, { useEffect, useState, createContext } from 'react';
import invoicesData from './data.json';
import NavBar from './components/NavBar';
import InvoiceDetails from './components/InvoiceDetails';
import Invoices from './components/Invoices';
import EditOrCreateInvoice from './components/EditOrCreateInvoice';
import InvoiceHeader from './components/InvoiceHeader';
import { CSSTransition } from 'react-transition-group';
export const InvoiceContext = createContext();

function App() {
  const [dayTheme, setDayTheme] = useState(true);
  const [invoices, setInvoices] = useState([]);
  const [newInvoice, setNewInvoice] = useState(false);
  // Both the edit invoice page and the invoice details will use the data below //
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [showEditInvoice, setShowEditInvoice] = useState(false);
  const [showInvoiceDetails, setShowInvoiceDetails] = useState(false);
  const [showInvoices, setShowInvoices] = useState(true);
  // const [editInvoice, setEditInvoice] = useState(false);

  useEffect(() => {
    setInvoices(invoicesData);
    console.log(invoicesData[0]);
  }, []);

  const filterInvoices = (filterType) => {};

  const createdInvoice = (id, newInv) => {};

  const deleteInvoice = (id) => {};

  const goBack = () => {
    setShowInvoiceDetails(false);
    setTimeout(() => {
      setShowEditInvoice(true);
    }, 500);
  };

  /* Below is the function which will show the chosen invoice to update */

  const invoiceToUpdate = (id, updatedInvoice) => {
    console.log(updatedInvoice.id);
    setShowInvoices(false);

    setInvoices(invoices.filter((invoice) => invoice.id !== updatedInvoice.id));

    setInvoices((prevInvoices) => prevInvoices.concat(updatedInvoice));

    setShowEditInvoice(false);

    setTimeout(() => {
      setShowInvoiceDetails(false);
      setShowInvoices(true);
    }, 500);
  };

  const editInvoice = () => {
    setShowInvoiceDetails(false);
    setTimeout(() => {
      setShowEditInvoice(true);
    }, 500);
  };

  /* Below is the function which will select the chosen invoice to display it in detail */

  const chosenInvoice = (id) => {
    console.log(id);
    const selectedInvoice = invoices.filter((invoice) => invoice.id === id);
    setSelectedInvoice(selectedInvoice);
    setShowInvoices(false);
    setTimeout(() => {
      setShowInvoiceDetails(true);
    }, 500);
  };

  return (
    <div className='App'>
      <InvoiceContext.Provider
        value={{
          invoices,
          filterInvoices,
          dayTheme,
          chosenInvoice,
          selectedInvoice,
          setDayTheme,

          invoiceToUpdate,
          createdInvoice,
          deleteInvoice,
          editInvoice,
          goBack,
          showInvoices,
          showInvoiceDetails,
        }}>
        <div className='main-invoice-container'>
          <NavBar />

          <CSSTransition
            in={showInvoices}
            timeout={500}
            classNames='invoices-move'
            unmountOnExit>
            <InvoiceHeader />
          </CSSTransition>

          <Invoices />

          <CSSTransition
            in={showInvoiceDetails}
            timeout={500}
            classNames='invoicesDetails-move'
            unmountOnExit>
            <InvoiceDetails />
          </CSSTransition>
        </div>
        <CSSTransition
          in={showEditInvoice}
          timeout={500}
          classNames='invoicesDetails-move'
          unmountOnExit>
          <EditOrCreateInvoice />
        </CSSTransition>
      </InvoiceContext.Provider>
    </div>
  );
}

export default App;
