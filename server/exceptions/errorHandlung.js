// Error handling middleware for Express.js
class ErrorHandler extends Error {
  status;
  errors;
  constructor(status, message, errors = []) {
    super(message);
    this.status = status;
    this.errors = errors;
  }
  static EmptyFieldError(message = "") {
    return new ErrorHandler(
      422,
      "Empty Field Error - All fields are required- " + message
    );
  }
  static RegistrationError(message = "") {
    return new ErrorHandler(501, "Registration Error - " + message);
  }
  static UnauthorizedError(message = "") {
    return new ErrorHandler(401, "Unauthorized Access - " + message);
  }
  static ForbiddenError(message = "") {
    return new ErrorHandler(403, "Forbidden- " + message);
  }
  static NotFoundError(message = "") {
    return new ErrorHandler(404, "Not Found - " + message);
  }
  static BadRequestError(message = "") {
    return new ErrorHandler(400, "Bad Request - " + message);
  }
  static InternalServerError(message = "") {
    return new ErrorHandler(500, "Internal Server Error - " + message);
  }
  static ValidationNameError(message = "") {
    return new ErrorHandler(
      422,
      "Validation Name Error- Name must be at least 2 characters long and less than 30 characters long " +
        message
    );
  }
  static ValidationEmailError(message = "") {
    return new ErrorHandler(
      422,
      "Validation Email Error- Email must be a valid email address " + message
    );
  }
  static ValidationPasswordError() {
    return new ErrorHandler(
      422,
      "Validation Password Error- Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character"
    );
  }
  static ConflictError(message = "") {
    return new ErrorHandler(409, "Conflict - " + message);
  }
  static NotAcceptableError(message = "") {
    return new ErrorHandler(406, "Not Acceptable - " + message);
  }
  static SendEmailError(message = "") {
    return new ErrorHandler(500, "Send Email Error - Failed to send email - " + message);
  }
}
export default  ErrorHandler;
