const mongoose = require('mongoose')
const Schema = mongoose.Schema 

const activitySchema = new Schema({
  name: {
    type: String,
  },
  form: {
    type: String,
  },
  isOpen: {
    type: Boolean
  },
  description: {
    type: String
  },
  creator: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  }
}, {
  timestamps: true,
})

module.exports = mongoose.model('activities', activitySchema)

