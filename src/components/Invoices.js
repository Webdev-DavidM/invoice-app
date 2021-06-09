import { SignalCellularNoSimOutlined } from '@material-ui/icons';
import React, { useContext } from 'react';
import { CSSTransition } from 'react-transition-group';
import { InvoiceContext } from '../App';
import Invoice from './Invoice';

export default function Invoices({ filter }) {
  const { invoices } = useContext(InvoiceContext);

  let invoicesToDisplay = () => {
    console.log(filter, invoices);
    let filteredInvoices = invoices;
    switch (filter) {
      case 'draft':
        filteredInvoices = invoices.filter(
          (invoice) => invoice.status === 'draft'
        );
        break;
      case 'pending':
        filteredInvoices = invoices.filter(
          (invoice) => invoice.status === 'pending'
        );
        break;
      case 'paid':
        filteredInvoices = invoices.filter(
          (invoice) => invoice.status === 'paid'
        );
        break;
      case 'none':
        filteredInvoices = invoices;
        break;
      default:
        filteredInvoices = invoices;
        break;
    }
    return filteredInvoices.map((invoice) => <Invoice invoice={invoice} />);
  };

  return <>{invoicesToDisplay()}</>;
}
