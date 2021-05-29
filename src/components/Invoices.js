import React, { useContext } from 'react';
import { CSSTransition } from 'react-transition-group';
import { InvoiceContext } from '../App';
import Invoice from './Invoice';

export default function Invoices() {
  const { invoices } = useContext(InvoiceContext);
  return (
    <>
      {invoices.map((invoice) => (
        <Invoice invoice={invoice} />
      ))}
    </>
  );
}
