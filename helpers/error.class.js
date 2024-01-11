module.exports = class ErrorHandler extends Error {
  constructor(statusCode, message) {
    super();
    this.success = false;
    this.status = "error";
    this.statusCode = statusCode;
    this.message = message;
  }
}
