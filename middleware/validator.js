const { check, validationResult } = require("express-validator");

exports.signupValidator = [
  check("username")
    .not()
    .isEmpty()
    .trim()
    .withMessage("All fields are required"),

  check("email").isEmail().normalizeEmail().withMessage("Invalid Email"),

  check("password")
    .isLength({ min: 6 })
    .withMessage("Password must be of atleast 6 character"),
];
exports.signinValidator = [
  check("email").isEmail().normalizeEmail().withMessage("Invalid Email"),

  check("password")
    .isLength({ min: 6 })
    .withMessage("Password must be of atleast 6 character"),
];

exports.validatorResult = (req, res, next) => {
  const result = validationResult(req);
  const hasErrors = !result.isEmpty();
  if (hasErrors) {
    const firstError = result.array()[0].msg;
    return res.status(400).json({
      errorMessage: firstError,
    });
    // console.log("haserrors", hasErrors);
    // console.log("result:", result);
  }
  next();
};
