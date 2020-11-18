const { check } = require('express-validator');

exports.postQuestion = [
  check('textone', 'Text one cannot be empty!').not().isEmpty().escape(), 
  check('texttwo', 'Text  cannot be empty!').optional().escape(),
];

exports.postAnswer = [
  check('text', 'Anwer cannot be empty!').not().isEmpty().escape(),
];
