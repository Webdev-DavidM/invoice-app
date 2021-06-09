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
import DeleteModal from './components/DeleteModal';
export const InvoiceContext = createContext();

function App() {
  const [dayTheme, setDayTheme] = useState(true);
  const [invoices, setInvoices] = useState([]);
  const [newInvoice, setNewInvoice] = useState([]);
  const [showNewInvoice, setShowNewinvoice] = useState(false);
  const [filter, setFilterInvoices] = useState('none');
  const [deleteModal, setDeleteModal] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState([]);
  const [backgroundGreyedOut, setBackgroundGreyedOut] = useState(false);
  const [showEditInvoice, setShowEditInvoice] = useState(false);
  const [showInvoiceDetails, setShowInvoiceDetails] = useState(false);
  const [showInvoices, setShowInvoices] = useState(true);

  useEffect(() => {
    setInvoices(invoicesData);
    setFilterInvoices(invoicesData);
  }, []);

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

  const cancel = () => {
    setShowEditInvoice(false);
    setShowNewinvoice(false);
    setBackgroundGreyedOut(false);
    setShowInvoiceDetails(false);
    window.scrollTo(0, 0);
    setTimeout(() => {
      setShowInvoices(true);
    }, 500);

    /* return the user to the top of the screen */
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

  const goBackEditOrCreate = () => {
    setShowNewinvoice(false);
    setShowEditInvoice(false);
  };

  const addNewInvoiceToState = (invoice) => {
    setInvoices(invoices.concat(invoice));
    setBackgroundGreyedOut(false);
    setShowNewinvoice(false);
    setShowInvoiceDetails(false);
    window.scrollTo(0, 0);
    setTimeout(() => {
      setShowInvoices(true);
    }, 500);
  };

  const displayNewInvoice = () => {
    let defaultValues = newInvoiceDefaultValues();
    setBackgroundGreyedOut(true);
    setNewInvoice(defaultValues);
    setShowNewinvoice(true);
  };

  const invoiceToUpdate = (updatedInvoice) => {
    console.log(updatedInvoice.id);
    setShowInvoices(false);
    setInvoices(invoices.filter((invoice) => invoice.id !== updatedInvoice.id));
    setInvoices((prevInvoices) => prevInvoices.concat(updatedInvoice));
    setShowEditInvoice(false);
    setBackgroundGreyedOut(false);
    setShowInvoiceDetails(false);
    window.scrollTo(0, 0);
    setTimeout(() => {
      setShowInvoices(true);
    }, 500);
  };

  const editInvoice = () => {
    setBackgroundGreyedOut(true);
    setShowEditInvoice(true);
  };

  const chosenInvoice = (id) => {
    setFilterInvoices('none');
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
          markAsPaid,
          setDeleteModal,
          addNewInvoiceToState,
          invoiceToUpdate,
          cancel,
          showDeleteModal,
          deleteInvoice,
          editInvoice,
          newInvoice,
          deleteModal,
          setBackgroundGreyedOut,
          goBackDetails,
          goBackEditOrCreate,
          goBack,
          showInvoices,
          showInvoiceDetails,
        }}>
        <CSSTransition
          in={deleteModal}
          timeout={500}
          classNames='invoices-move'
          unmountOnExit>
          <DeleteModal />
        </CSSTransition>

        <div className='main-invoice-container'>
          <NavBar />

          <CSSTransition
            in={showInvoices}
            timeout={500}
            classNames='invoices-move'
            unmountOnExit>
            <InvoiceHeader />
          </CSSTransition>

          {invoices.length === 0 ? (
            <div className='no-invoice-image'>
              <img
                src={`${process.env.PUBLIC_URL}/assets/illustration-empty.svg`}
                alt='no invoices'
              />
            </div>
          ) : (
            <Invoices filter={filter} />
          )}

          <CSSTransition
            in={showInvoiceDetails}
            timeout={500}
            classNames='invoicesDetails-move'
            unmountOnExit>
            <InvoiceDetails />
          </CSSTransition>
        </div>

        <CSSTransition
          in={backgroundGreyedOut}
          timeout={500}
          classNames='invoices-move'
          unmountOnExit>
          <div className='greyed_out_background'></div>
        </CSSTransition>

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
