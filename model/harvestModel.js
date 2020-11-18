const mongoose = require('mongoose')
const Schema = mongoose.Schema

const harvestSchema = new Schema({
  batchNo: {
    type: String
  },
  amount: {
    type: Number
  },
  farm: {
    type: Schema.Types.ObjectId,
    ref: 'farms'
  },
  date: {
    type: Date,
    default: Date.now
  },
  creator: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  organic: {
    type: Boolean,
  },
  vehicle: {
    type: Schema.Types.ObjectId,
    ref: 'vehicles'
  },
  task: {
      taskId: Schema.Types.ObjectId,
      ref: 'tasks'
  },
  comments: {
    type: String
  }
}, {
  timestamps: true
})

module.exports = mongoose.model('harvests', harvestSchema)