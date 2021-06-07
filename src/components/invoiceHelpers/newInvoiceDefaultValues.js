import generateNewInvoiceID from './generateNewInvoiceID';
import generateCreatedAt from './generateCreatedAt';
import { generatePaymentDue } from './generatePaymentDue';

const newInvoiceDefaultValues = () => {
  return {
    id: generateNewInvoiceID(),
    createdAt: generateCreatedAt(),
    paymentDue: '',
    description: '',
    paymentTerms: 30,
    clientName: '',
    clientEmail: '',
    senderAddress: {
      street: '',
      city: '',
      postCode: '',
      country: '',
    },
    clientAddress: {
      street: '',
      city: '',
      postCode: '',
      country: '',
    },
    status: 'pending',
    items: [
      {
        name: '',
        quantity: 1,
        price: 0,
        total: 0,
      },
    ],
    total: '',
  };
};

export default newInvoiceDefaultValues;
