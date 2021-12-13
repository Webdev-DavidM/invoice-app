// This helper function makes sure the user has selected at least one item.

const validateItems = (values) => {
  if (values.items.length > 0) {
    return true;
  } else {
    return false;
  }
};

export default validateItems;
