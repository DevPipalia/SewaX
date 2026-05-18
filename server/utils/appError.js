class AppError extends Error {
  constructor(message, statusCode = 500, failureReasons = []) {
    super(message);

    this.statusCode = statusCode;
    this.failureReasons = failureReasons;
  }
}

export default AppError;
