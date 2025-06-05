import { body } from "express-validator";
import validateError from "./validateError.js";

const userValidationRules = [
  body("name")
    .isString()
    .isLength({ min: 2, max: 10 })
    .optional()
    .withMessage(
      "the user name is required and must contain at least 2 and max 10 characters."
    ),
  body("email").isString().isEmail().withMessage("please enter a valid email!"),
  body("password")
    .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[?!])[0-9a-zA-Z?!]{8,}$/)
    .withMessage(
      "the password must contain at least 1 number, 1 lowercase and uppercase character, one special character and be at least 8 chracters long."
    ),
  validateError,
];

export { userValidationRules };
