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
import styles from './App.scss';
export const InvoiceContext = createContext();

function App() {
  const [dayTheme, setDayTheme] = useState(true);
  const [invoices, setInvoices] = useState([]);

  const [newInvoice, setNewInvoice] = useState([]);
  const [showNewInvoice, setShowNewinvoice] = useState(false);
  const [filter, setFilterInvoices] = useState('none');
  const [deleteModal, setDeleteModal] = useState(false);
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

  const markAsPaid = (id) => {
    let updatedSelectedInvoice = null;
    let updatedInvoices = invoices.map((invoice) => {
      if (invoice.id === id) {
        updatedSelectedInvoice = { ...invoice, status: 'paid' };
        return { ...invoice, status: 'paid' };
      } else {
        return invoice;
      }
    });
    setInvoices(updatedInvoices);
    setSelectedInvoice([updatedSelectedInvoice]);
  };

  const deleteInvoice = () => {
    console.log(selectedInvoice[0].id);
    const newInvoices = invoices.filter(
      (invoice) => invoice.id !== selectedInvoice[0].id
    );
    setInvoices(newInvoices);
    setDeleteModal(false);
    setShowInvoiceDetails(false);
    setTimeout(() => {
      setShowInvoices(true);
    }, 500);
  };

  const showDeleteModal = () => {
    setDeleteModal(true);
  };

  const goBack = () => {
    setShowInvoiceDetails(false);
    setTimeout(() => {
      setShowEditInvoice(true);
    }, 500);
  };

  const goBackDetails = () => {
    setShowInvoiceDetails(false);
    setTimeout(() => {
      setShowInvoices(true);
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
      <CSSTransition
        in={deleteModal}
        timeout={500}
        classNames='invoices-move'
        unmountOnExit>
        <div className='delete_modal_flex_container'>
          <div className='modal_container'>
            <h2>Confirm deletion</h2>
            <div className='body_1'>
              Are you sure you want to delete{' '}
              {selectedInvoice.length !== 0 && selectedInvoice[0].id}? This
              action cannot be undone.
            </div>
            <h4 className='button_container'>
              <div onClick={() => setDeleteModal(false)} className='cancel_btn'>
                Cancel
              </div>
              <div
                onClick={() => deleteInvoice()}
                deleteInvoice
                className='delete_btn'>
                Delete
              </div>
            </h4>
          </div>
        </div>
      </CSSTransition>

      <InvoiceContext.Provider
        value={{
          invoices,

          dayTheme,
          chosenInvoice,
          selectedInvoice,
          setFilterInvoices,
          setDayTheme,
          displayNewInvoice,
          markAsPaid,
          // createNewInvoice,
          addNewInvoiceToState,
          invoiceToUpdate,
          createdInvoice,
          showDeleteModal,
          deleteInvoice,
          editInvoice,
          newInvoice,
          deleteModal,
          goBackDetails,
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
