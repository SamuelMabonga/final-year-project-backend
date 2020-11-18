// Import express-validator
const { validationResult } = require('express-validator');

// Import Schema
const Users = require('../model/usermodel');
const Activities = require('../model/activityModel')
const Roles = require('../model/rolesModel')
const Tasks = require('../model/taskModel') 
const Harvests = require('../model/harvestModel')

// post a task
exports.postTask = async (req, res) => {
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    return res.status(422).json(errors.array())
  }

  const user = await Users.findById(req.user.id).then((user) => user)
  console.log(user)
  
  if (user.isAdmin) {
    const newTask = new Tasks({
      activityId: req.body.activityId,
      creator: req.user.id,
      assignees: [...req.body.assignees],
      status: { onGoing: false, pending: true },
    })

    newTask.save((error, taskObj) => {
      if (error) {
        return res.status(500).json({
          errorMsg: 'Failed to save new task!'
        })
      }

      return res.status(200).json(taskObj)
    })
  } else {
    res.status(400).json({ errorMsg: 'You are not authorized to create a new task!'})
  }
}

