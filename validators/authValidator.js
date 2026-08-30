import {body} from "express-validator"
const registerValidator = [
    body('name')
    .trim()
    .notEmpty()
    .withMessage("Name is required")
    .isString()
    .withMessage("Name should be string")
    .isLength({min : 4})
    .withMessage("Name should of minimum 4 letters"),

    body('email')
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid email format")
    .normalizeEmail(),

    body('password')
    .trim()
    .notEmpty()
    .withMessage("Password is required")
    .isLength({min : 6})
    .withMessage("Password should contain atleast 6 characters")

];

const loginValidator = [
    body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid email format")
    .normalizeEmail() ,
    body('password')
    .notEmpty()
    .withMessage("Password is required")
    .isLength({min : 6})
    .withMessage("Password should contain atleast 6 characters")
]
export {registerValidator,loginValidator}