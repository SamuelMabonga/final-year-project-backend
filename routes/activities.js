// create an express router
const express = require('express');
const { validationResult } = require('express-validator');

const router = express.Router();

// import passport
const passport = require('passport');

// import controllers
const controllers = require('../controllers/activityControllers');

// import validators
const validators = require('./validators/activities');

// @type - POST
// @route - /activities
// @desc - route for toggling user's active status
// @access - PRIVATE
router.post(
  '/activities',
  [
    validators.postActivity, passport.authenticate('jwt', { session: false })
  ],
  controllers.postActivity
)

// @type - POST
// @route - /task
// @desc - post task
// @access - PRIVATE
router.post(
  '/task',
  [
    validators.postTask, passport.authenticate('jwt', { session: false })
  ],
  controllers.postTask
)
