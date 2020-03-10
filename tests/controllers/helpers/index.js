const sinon = require("sinon");

const mockRequest = sessionData => {
  return {
    session: { data: sessionData }
  };
};

const mockResponse = () => {
  const res = {};
  res.status = sinon.stub().returns(res);
  res.json = sinon.stub().returns(res);
  return res;
};

module.exports = { mockRequest, mockResponse };
