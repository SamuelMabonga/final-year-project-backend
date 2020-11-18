const { check } = require('express-validator')

exports.postTask = [
  check('activityId'),
  check('assignees'),
  check('status'),
]

