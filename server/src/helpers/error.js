class ErrorHandler extends Error {
  constructor(statusCode, message) {
    super();
    this.statusCode = statusCode;
    this.message = message;
  }
}

class NotAuthorized extends Error {
  constructor(
    message = 'you do not have the permissions to view this resource'
  ) {
    super();
    this.statusCode = 403;
    this.message = message;
  }
}
class NotFoundError extends Error {
  constructor(message = 'could not find any records') {
    super();
    this.statusCode = 404;
    this.message = message;
  }
}
const handleError = (err, res) => {
  const { statusCode = 500, message = 'Something went wrong...' } = err;
  res.status(statusCode).json({
    status: 'error',
    statusCode,
    message,
  });
};

module.exports = {
  ErrorHandler,
  handleError,
  NotFoundError,
  NotAuthorized,
};
