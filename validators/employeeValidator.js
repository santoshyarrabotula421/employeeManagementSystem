import { body,query } from "express-validator";

const createEmployeeValidator = [
    body("user")
        .notEmpty()
        .withMessage("User ID is required")
        .isMongoId()
        .withMessage("Invalid User ID"),

    body("employeeId")
        .trim()
        .notEmpty()
        .withMessage("Employee ID is required"),

    body("department")
        .trim()
        .notEmpty()
        .withMessage("Department is required"),

    body("designation")
        .trim()
        .notEmpty()
        .withMessage("Designation is required"),

    body("salary")
        .notEmpty()
        .withMessage("Salary is required")
        .isNumeric()
        .withMessage("Salary must be a number")
        .custom((value) => value >= 0)
        .withMessage("Salary cannot be negative"),

    body("phone")
        .trim()
        .notEmpty()
        .withMessage("Phone number is required")
        .isMobilePhone("any")
        .withMessage("Invalid phone number"),

    body("joiningDate")
        .notEmpty()
        .withMessage("Joining date is required")
        .isISO8601()
        .withMessage("Invalid joining date")
];

const updateEmployeeValidator = [
    body("department")
        .optional()
        .trim()
        .notEmpty()
        .withMessage("Department cannot be empty"),

    body("designation")
        .optional()
        .trim()
        .notEmpty()
        .withMessage("Designation cannot be empty"),

    body("salary")
        .optional()
        .isNumeric()
        .withMessage("Salary must be a number")
        .custom((value) => value >= 0)
        .withMessage("Salary cannot be negative"),

    body("phone")
        .optional()
        .isMobilePhone("any")
        .withMessage("Invalid phone number"),

    body("joiningDate")
        .optional()
        .isISO8601()
        .withMessage("Invalid joining date")
];

const getEmployeesValidator = [
    query('page')
    .optional()
    .isInt({min : 1})
    .withMessage("Page must be a positive integer"),

    query('limit')
    .optional()
    .isInt({max : 100})
    .withMessage("Limit must be atmax of 100"),

    query("sortBy")
        .optional()
        .isIn([
            "salary",
            "joiningDate",
            "employeeId",
            "department",
            "designation",
            "createdAt"
        ])
        .withMessage("Invalid sort field"),

    query("order")
        .optional()
        .isIn(["asc", "desc"])
        .withMessage("Order must be either asc or desc")
]
export {
    createEmployeeValidator,
    updateEmployeeValidator,
    getEmployeesValidator
};