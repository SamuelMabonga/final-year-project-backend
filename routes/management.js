// create an express router
const express = require('express');
const { validationResult } = require('express-validator');

const router = express.Router();

// import passport
const passport = require('passport');

// import controllers
const controllers = require('../controllers/managementControllers');

// import validators
const validators = require('./validators/management');

// @type - POST
// @route - /setup
// @desc - route for setting up data
// @access - PRIVATE
router.get(
  '/setup',
  passport.authenticate('jwt', { session: false }),
  controllers.setup,
)

// @type - POST
// @route - /:userId/makeActive
// @desc - route for toggling user's active status
// @access - PRIVATE
router.post(
  '/:userId/makeActive',
  passport.authenticate('jwt', { session: false }),
  controllers.makeActive,
)

// @type - POST
// @route - /:userId/makeActive
// @desc - route for toggling user's active status
// @access - PRIVATE
router.post(
  '/:userId/makeAdmin',
  passport.authenticate('jwt', { session: false }),
  controllers.makeAdmin,
)

// @type - POST
// @route - /role
// @desc - post a new role
// @access - PRIVATE
router.post(
  '/role',
  [
    validators.createRole, passport.authenticate('jwt', { session: false })
  ],
  controllers.createRole
)

// @type - DELETE
// @route - /role
// @desc - delete a role
// @access - PRIVATE
router.delete(
  '/role',
  passport.authenticate('jwt', { session: false }),
  controllers.deleteRole
)

// @type - POST
// @route - /activity
// @desc - post a new activity
// @access - PRIVATE
router.post(
  '/activity',
  [
    validators.createActivity, passport.authenticate('jwt', { session: false })
  ],
  controllers.createActivity
)

// @type - DELETE
// @route - /activity
// @desc - delete activity
// @access - PRIVATE
router.delete(
  '/activity',
  passport.authenticate('jwt', { session: false }),
  controllers.deleteActivity
)

// @type - POST
// @route - /farmer
// @desc - post a new farmer
// @access - PRIVATE
router.post(
  '/farmer',
  [
    validators.createFarmer, passport.authenticate('jwt', { session: false })
  ],
  controllers.createFarmer
)

// @type - DELETE
// @route - /farmer
// @desc - delete farmer
// @access - PRIVATE
router.delete(
  '/activity',
  passport.authenticate('jwt', { session: false }),
  controllers.deleteFarmer
)

// @type - POST
// @route - /farm
// @desc - post a new farm
// @access - PRIVATE
router.post(
  '/farm',
  [
    validators.createFarm, passport.authenticate('jwt', { session: false })
  ],
  controllers.createFarm
)

// @type - DELETE
// @route - /farm
// @desc - delete farm
// @access - PRIVATE
router.delete(
  '/farm',
  passport.authenticate('jwt', { session: false }),
  controllers.deleteFarm
)

// @type - POST
// @route - /facility
// @desc - post a new facility
// @access - PRIVATE
router.post(
  '/facility',
  [
    validators.createFacility, passport.authenticate('jwt', { session: false })
  ],
  controllers.createFacility
)

// @type - DELETE
// @route - /facility
// @desc - delete facility
// @access - PRIVATE
router.delete(
  '/facility',
  passport.authenticate('jwt', { session: false }),
  controllers.deleteFacility
)

// export router
module.exports = router