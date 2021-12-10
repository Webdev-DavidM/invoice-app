import { formatDateUK } from "../../helpers/formatDate";

const formatDate = (date) => {
  const year = date.substring(0, 4);
  const month = date.substring(5, 7);
  const day = date.substring(8, 10);
  return formatDateUK(`${year}-${month}-${day}`);
};

export default formatDate;
