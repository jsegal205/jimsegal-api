const removeInternalProps = (hydradedObject) => {
  const { REQUIRED_FIELDS, ...relevant } = hydradedObject;
  return relevant;
};

module.exports = {
  removeInternalProps,
};
