export const validateDate = () => {
  return (value, helpers) => {
    if (!value) {
      return helpers.error("any.required");
    }

    const dateFormatRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateFormatRegex.test(value)) {
      return helpers.error("date.format");
    }

    const parsedDate = new Date(value);

    if (isNaN(parsedDate) || parsedDate <= new Date()) {
      return helpers.error("date.greater");
    }

    return value;
  };
};
