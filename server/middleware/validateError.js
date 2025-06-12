import { validationResult } from "express-validator";

export default function validateError(req, res, next) {
  const errors = validationResult(req);

  if (errors.isEmpty()) {
    return next();
  }
  const errorMessages = errors.array().map((err) => {
    return { [err.path]: err.msg };
  });
  return next({ status: 422, errors: errorMessages });
}
