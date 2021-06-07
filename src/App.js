import './App.scss';
import React, { useEffect, useState, createContext } from 'react';
import invoicesData from './data.json';
import NavBar from './components/NavBar';
import InvoiceDetails from './components/InvoiceDetails';
import Invoices from './components/Invoices';
import EditInvoice from './components/EditInvoice';
import CreateInvoice from './components/CreateInvoice';
import InvoiceHeader from './components/InvoiceHeader';
import newInvoiceDefaultValues from './components/invoiceHelpers/newInvoiceDefaultValues';
import { CSSTransition } from 'react-transition-group';
export const InvoiceContext = createContext();

function App() {
  const [dayTheme, setDayTheme] = useState(true);
  const [invoices, setInvoices] = useState([]);

  const [newInvoice, setNewInvoice] = useState([]);
  const [showNewInvoice, setShowNewinvoice] = useState(false);
  const [filter, setFilterInvoices] = useState('none');
  // Both the edit invoice page and the invoice details will use the data below //
  const [selectedInvoice, setSelectedInvoice] = useState([]);
  const [showEditInvoice, setShowEditInvoice] = useState(false);
  const [showInvoiceDetails, setShowInvoiceDetails] = useState(false);
  const [showInvoices, setShowInvoices] = useState(true);
  // const [editInvoice, setEditInvoice] = useState(false);

  useEffect(() => {
    setInvoices(invoicesData);
    setFilterInvoices(invoicesData);
  }, []);

  const createdInvoice = (id, newInv) => {};

  const deleteInvoice = (id) => {};

  const goBack = () => {
    setShowInvoiceDetails(false);
    setTimeout(() => {
      setShowEditInvoice(true);
    }, 500);
  };

  const addNewInvoiceToState = (invoice) => {
    setInvoices(invoices.concat(invoice));
    setShowNewinvoice(false);
    setTimeout(() => {
      setShowInvoices(true);
    }, 500);
  };

  const displayNewInvoice = () => {
    let defaultValues = newInvoiceDefaultValues();
    setShowInvoices(false);
    setNewInvoice(defaultValues);
    setTimeout(() => {
      setShowNewinvoice(true);
    }, 500);
  };

  /* Below is the function which will show the chosen invoice to update */

  const invoiceToUpdate = (updatedInvoice) => {
    console.log(updatedInvoice.id);
    setShowInvoices(false);

    setInvoices(invoices.filter((invoice) => invoice.id !== updatedInvoice.id));

    setInvoices((prevInvoices) => prevInvoices.concat(updatedInvoice));

    setShowEditInvoice(false);
    // setSelectedInvoice([]);

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

  // const createNewInvoice = () => {
  //   setSelectedInvoice([]);
  //   setShowInvoices(false);
  //   setTimeout(() => {
  //     setShowEditInvoice(true);
  //   }, 500);
  // };

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

          dayTheme,
          chosenInvoice,
          selectedInvoice,
          setFilterInvoices,
          setDayTheme,
          displayNewInvoice,
          // createNewInvoice,
          addNewInvoiceToState,
          invoiceToUpdate,
          createdInvoice,
          deleteInvoice,
          editInvoice,
          newInvoice,
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

          <Invoices filter={filter} />

          <CSSTransition
            in={showInvoiceDetails}
            timeout={500}
            classNames='invoicesDetails-move'
            unmountOnExit>
            <InvoiceDetails />
          </CSSTransition>
        </div>
        <CSSTransition
          in={showNewInvoice}
          timeout={500}
          classNames='invoicesDetails-move'
          unmountOnExit>
          <CreateInvoice />
        </CSSTransition>
        <CSSTransition
          in={showEditInvoice}
          timeout={500}
          classNames='invoicesDetails-move'
          unmountOnExit>
          <EditInvoice />
        </CSSTransition>
      </InvoiceContext.Provider>
    </div>
  );
}

export default App;
