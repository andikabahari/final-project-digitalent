const ok = (data = null) => {
  const response = {
    data,
    status: 200,
    success: true
  };

  return response;
};

const badRequest = (data = null) => {
  const error = new Error();

  error.message = "Bad Request";
  error.status = 400;
  error.success = false;

  if (data instanceof Error) error.message = data.message;
  else if (data) error.message = data;

  return error;
};

const forbidden = (data = null) => {
  const error = new Error();

  error.message = "Forbidden";
  error.status = 401;
  error.success = false;

  if (data instanceof Error) error.message = data.message;
  else if (data) error.message = data;

  return error;
};

const notFound = (data = null) => {
  const error = new Error();

  error.message = "Page not found";
  error.status = 404;
  error.success = false;

  if (data instanceof Error) error.message = data.message;
  else if (data) error.message = data;

  return error;
};

const serverError = (data = null) => {
  const error = new Error();

  error.message = "Internal Server Error";
  error.status = 500;
  error.success = false;

  if (data instanceof Error) error.message = data.message;
  else if (data) error.message = data;

  return error;
};

module.exports = {
  ok,
  badRequest,
  forbidden,
  notFound,
  serverError
};
