const { check } = require('express-validator');

exports.createRole = [
  
]

exports.createActivity = [
  check('name'),
  check('form'),
  check('isOpen'),
  check('description'),
]

exports.createFarmer = [

]

exports.createFarm = [

]

exports.createFacility = [

]