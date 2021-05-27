export const formatDateUK = (date) => {
  const monthNumberToLabelMap = {
    1: 'January',
    2: 'February',
    3: 'March',
    4: 'April',
    5: 'May',
    6: 'June',
    7: 'July',
    8: 'August',
    9: 'September',
    10: 'October',
    11: 'November',
    12: 'December',
  };
  let formatDate = date.split('-');

  return `${formatDate[2]} ${monthNumberToLabelMap[parseInt(formatDate[1])]} ${
    formatDate[0]
  }`;
};
