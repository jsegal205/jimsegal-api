import Sinon from "sinon";

const mockRequest = (requestOptions) => {
  return {
    ...requestOptions,
  };
};

const mockResponse = () => {
  const res = {};

  res.status = Sinon.stub().returns(res);
  res.json = Sinon.stub().returns(res);
  res.sendFile = Sinon.stub().returns(res);
  res.send = Sinon.stub().returns(res);
  return res;
};

export { mockRequest, mockResponse };
