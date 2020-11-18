// import validators
const express = require('express');
const path = require('path');
const validators = require('./validators/signUproute');

// import controllers
const usercontrollers = require('../controllers/usercontrollers');

// import path

// import Express for the router
const router = express.Router();

// @type - POST
// @route - /auth
// @desc - route to index page
// @type - PUBLIC
router.get('/', (req, res) => {
  res.sendFile(path.resolve('public/index.html'));
});

// @type - POST
// @route - /auth/signup
// @desc - route for adding a user to the database
// @type - PUBLIC
router.post('/auth/signup', validators.signup, usercontrollers.signup);

// @type - POST
// @route - /auth/login
// @desc - route for authenticating a user to log in
// @type - PUBLIC
router.post('/auth/login', validators.login, usercontrollers.login);

// export router
module.exports = router;
