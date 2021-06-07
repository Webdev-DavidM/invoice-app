const generateNewInvoiceID = () => {
  let newId = '';
  const alphabet = 'abcdefghijklmnopqrstuvwxyz'
    .split('')
    .map((letter) => letter.toUpperCase());
  const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
  for (let i = 0; i < 2; i++) {
    newId += alphabet[Math.floor(Math.random() * alphabet.length)];
  }
  for (let i = 0; i < 4; i++) {
    newId += numbers[Math.floor(Math.random() * numbers.length)];
  }
  return newId;
};

export default generateNewInvoiceID;
