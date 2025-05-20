// Error handling middleware for Express.js
class ErrorHandler extends Error {
    status;
    errors;
    constructor(status, message, errors=[]) {
        super(message);
        this.status = status;
        this.errors = errors;
    }
    static UnauthorizedError() {
        return new ErrorHandler(401, "Unauthorized or Invalid Credentials");
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
    static ValidationError() {
        return new ErrorHandler(422, "Validation Error");
    }
    static ConflictError() {
        return new ErrorHandler(409, "Conflict");
    }
    static NotAcceptableError() {
        return new ErrorHandler(406,"Not Acceptable");
    }
}

export default  ErrorHandler;
