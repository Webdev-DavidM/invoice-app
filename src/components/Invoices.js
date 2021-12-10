import React, { useContext } from 'react';
import { InvoiceContext } from '../App';
import Invoice from './Invoice';

export default function Invoices({ filter }) {
  const { invoices } = useContext(InvoiceContext);

  let invoicesToDisplay = () => {
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
    return filteredInvoices.map((invoice, index) => (
      <Invoice invoice={invoice} key={index} />
    ));
  };

  return <>{invoicesToDisplay()}</>;
}
