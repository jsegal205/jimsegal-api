const sinon = require("sinon");

const mockRequest = (params) => {
  return {
    ...params,
  };
};

const mockResponse = () => {
  const res = {};
  res.status = sinon.stub().returns(res);
  res.json = sinon.stub().returns(res);
  res.sendFile = sinon.stub().returns(res);
  res.send = sinon.stub().returns(res);
  return res;
};

module.exports = { mockRequest, mockResponse };
