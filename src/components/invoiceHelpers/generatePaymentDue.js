import { formatDateUK } from '../../helpers/formatDate';
const { DateTime } = require('luxon');

export const generatePaymentDue = () => {
  const currentDate = new Date();

  let paymentDue = currentDate.setDate(currentDate.getDate() + 30);
  console.log(paymentDue);
};
