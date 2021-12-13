const calculateTotal = (values) => {
  let total =
    values.items.length > 1
      ? values.items.reduce((total, item) => {
          let subtotal = parseInt(item.price) * item.quantity;
          return total + subtotal;
        }, 0)
      : parseInt(values.items[0].price) * values.items[0].quantity;
  return total;
};

export default calculateTotal;
