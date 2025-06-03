// Error handling middleware for Express.js
class ErrorHandler extends Error {
    status;
    errors;
    constructor(status, message, errors=[]) {
        super(message);
        this.status = status;
        this.errors = errors;
    }
   static EmptyFieldError() {
        return new ErrorHandler(422, "Empty Field Error - All fields are required");
    }
    static UnauthorizedError() {
        return new ErrorHandler(401, "Unauthorized Access");
    }
    static ForbiddenError() {
        return new ErrorHandler(403, "Forbidden");
    }
    static NotFoundError() {
        return new ErrorHandler(404, "Not Found");
    }
    static BadRequestError() {
        return new ErrorHandler(400, "Bad Request");
    }
    static InternalServerError() {
        return new ErrorHandler(500, "Internal Server Error");
    }
    static ValidationNameError() {
        return new ErrorHandler(422, "Validation Name Error- Name must be at least 2 characters long and less than 30 characters long");
    }
    static ValidationEmailError() {
        return new ErrorHandler(422, "Validation Email Error- Email must be a valid email address");
    }
    static ValidationPasswordError() {
        return new ErrorHandler(422, "Validation Password Error- Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character");
    }
    static ConflictError() {
        return new ErrorHandler(409, "Conflict");
    }
    static NotAcceptableError() {
        return new ErrorHandler(406,"Not Acceptable");
    }
    static SendEmailError() {
        return new ErrorHandler(500, "Send Email Error - Failed to send email");
    }
}
export default  ErrorHandler;
