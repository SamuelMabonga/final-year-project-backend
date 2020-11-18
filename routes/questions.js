// create an express router
const express = require('express');

const router = express.Router();

// import passport
const passport = require('passport');

// import controllers
const controllers = require('../controllers/questionControllers');

// import validators
const validators = require('./validators/questions');

// @type - POST
// @route - /questions
// @desc - route for posting a question
// @access - PRIVATE
router.post(
  '/',
  [
    validators.postQuestion, passport.authenticate('jwt', { session: false }),
  ],
  controllers.post,
);

// @type - POST
// @route - /questions/:question_id/answers
// @desc - route for posting an answer
// @access - PRIVATE
router.post(
  '/:question_id/answers',
  [
    validators.postAnswer, passport.authenticate('jwt', { session: false }),
  ],
  controllers.postAnswer,
);

// @type - DELETE
// @route - /questions/:question_id
// @desc - route for deleting a specific question
// @access - PRIVATE
router.delete('/:question_id', passport.authenticate('jwt', { session: false }), controllers.delete);

// @type - GET
// @route - /questions/answers/:question_id
// @desc - route for viewing answers to a question
// @access - PUBLIC
router.get('/:question_id/answers', controllers.getAnswers);

// @type - POST
// @route - /questions/:question_id/accept
// @desc - route for accepting a preferred answer
// @access - PRIVATE
router.post('/:question_id/accept', passport.authenticate('jwt', { session: false }), controllers.acceptAnswer);

// @type - GET
// @route - /questions/:question_id
// @desc - get a specific question
// @access - PUBLIC
router.get('/:question_id', controllers.getQuestion);

// @type - GET
// @route - /questions
// @desc - get all questions
// @access - PUBLIC
router.get('/', controllers.getQuestions);

// @type - POST
// @route - /questions/:question_id
// @desc - upvote a question
// @access - PRIVATE
router.post('/:question_id/upvote', passport.authenticate('jwt', { session: false }), controllers.upvote)

// @type - POST
// @route - /questions/:question_id
// @desc - downvote a question
// @access - PRIVATE
router.post('/:question_id/downvote', passport.authenticate('jwt', { session: false }), controllers.downvote)

module.exports = router;
