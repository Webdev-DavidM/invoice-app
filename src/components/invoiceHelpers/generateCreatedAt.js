import { formatDateUK } from '../../helpers/formatDate';
const { DateTime } = require('luxon');

const generateCreatedAt = () => {
  let time = DateTime.now();
  const { year, month, day } = time.c;

  console.log(formatDateUK(`${year}-${month}-${day}`));
  return formatDateUK(`${year}-${month}-${day}`);
};

export default generateCreatedAt;
