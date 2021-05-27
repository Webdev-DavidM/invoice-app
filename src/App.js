import './App.scss';
import React, { useEffect, useState, createContext } from 'react';
import invoicesData from './data.json';
import NavBar from './components/NavBar';
import NewInvoice from './components/NewInvoice';
import InvoiceDetails from './components/InvoiceDetails';
import Invoices from './components/Invoices';
import EditInvoice from './components/EditInvoice';
import InvoiceHeader from './components/InvoiceHeader';
import { CSSTransition } from 'react-transition-group';
export const InvoiceContext = createContext();

function App() {
  const [dayTheme, setDayTheme] = useState(true);
  const [invoices, setInvoices] = useState([]);
  const [newInvoice, setNewInvoice] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [showInvoiceDetails, setShowInvoiceDetails] = useState(false);
  const [showInvoices, setShowInvoices] = useState(true);
  const [editInvoice, setEditInvoice] = useState(false);

  useEffect(() => {
    setInvoices(invoicesData);
  }, []);

  const filterInvoices = (filterType) => {};

  // Below will include making the invoice as draft

  const updateInvoice = (id, updatedInvoice) => {};

  const createdInvoice = (id, newInv) => {};

  const deleteInvoice = (id) => {};

  const goBack = () => {
    setShowInvoiceDetails(false);
    setTimeout(() => {
      setShowInvoices(true);
    }, 500);
  };

  const chosenInvoice = (id, bool) => {
    const selectedInvoice = invoices.filter((invoice) => invoice.id === id);
    setSelectedInvoice(selectedInvoice);
    setShowInvoices(bool);

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
          updateInvoice,
          createdInvoice,
          deleteInvoice,
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
      </InvoiceContext.Provider>
    </div>
  );
}

export default App;
