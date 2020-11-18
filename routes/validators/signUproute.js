// import express-validator
const { check } = require('express-validator');

// Validators for the signup route
exports.signup = [
  check('firstName').not().isEmpty().isLength({ min: 2 })
    .trim()
    .escape()
    .withMessage('First name must have more that 1 characters!'),
  check('lastName').not().isEmpty().isLength({ min: 2 })
    .trim()
    .escape()
    .withMessage('Last name must have more that 1 characters!'),
  // check('username').not().isEmpty().withMessage('Username cannot be empty!'),
  check('email').not().isEmpty().isEmail()
    .normalizeEmail()
    .withMessage('Your email is not valid!'),
  // check('phoneNumber').not().isEmpty().withMessage('Phone number cannot be empty!').isNumeric().withMessage('Phone number must be numeric!'),
  check('confirmPassword', 'Passwords do not match!').custom((value, { req }) => (value === req.body.password)),
  
  // check('location', 'Location must have more than 2 characters!').not().isEmpty().isLength({ min: 3 })
  //   .trim()
  //   .escape(),

  // check('gender', 'Gender must have more than 2 characters!').not().isEmpty().isLength({ min: 3 })
  //   .trim()
  //   .escape(),
  
  // check('age', 'Gender must have more than 1 characters!').not().isEmpty().isLength({ min: 2 })
  //   .trim()
  //   .escape(),

  // check('village', 'Village must have more than 1 characters!').isLength({ min: 2 })
  //   .trim()
  //   .escape(),
];

// Validators for the login route
exports.login = [
  check('email').not().isEmpty().isEmail()
    .normalizeEmail()
    .withMessage('Your email is not valid!'),
  check('password', 'Password cannot be empty!').not().isEmpty().escape(),
];
