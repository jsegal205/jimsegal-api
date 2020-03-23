const validateRequiredFields = (obj = {}) => {
  if (!obj.REQUIRED_FIELDS) {
    return { valid: true, message: "" };
  }

  const invalidFields = obj.REQUIRED_FIELDS.reduce((acc, currReqFieldName) => {
    if (!!obj[currReqFieldName] === false) {
      acc.push(currReqFieldName);
    }
    return acc;
  }, []);

  return {
    valid: invalidFields.length === 0,
    message:
      invalidFields.length === 0
        ? ""
        : `${invalidFields.join(", ")} - fields are required`
  };
};

module.exports = {
  validateRequiredFields
};
