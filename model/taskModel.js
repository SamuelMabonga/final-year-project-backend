const mongoose = require('mongoose')
const Schema = mongoose.Schema

const taskSchema = new Schema({
  activityId: {
    type: Schema.Types.ObjectId,
    ref: 'activities'
  },
  creator: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  assignees: [
    {
      userId: {
        type: Schema.Types.ObjectId,
        ref: 'users'
      },
      role: {
        type: String
      }
    },
  ],
  status: {
    onGoing: Boolean,
    pending: Boolean,
  },
}, { timestamps: true })

module.exports = mongoose.model('tasks', taskSchema)