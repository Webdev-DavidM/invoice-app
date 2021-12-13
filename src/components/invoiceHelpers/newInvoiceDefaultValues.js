import generateNewInvoiceID from "./generateNewInvoiceID";
import generateCreatedAt from "./generateCreatedAt";

const newInvoiceDefaultValues = () => {
  return {
    id: generateNewInvoiceID(),
    createdAt: generateCreatedAt(),
    paymentDue: "",
    description: "",
    clientName: "",
    clientEmail: "",
    senderAddress: {
      street: "",
      city: "",
      postCode: "",
      country: "",
    },
    clientAddress: {
      street: "",
      city: "",
      postCode: "",
      country: "",
    },
    status: "pending",
    items: [],
    total: "0",
  };
};

export default newInvoiceDefaultValues;
