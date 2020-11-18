const mongoose = require('mongoose');

const { Schema } = mongoose;

const rolesSchema = new Schema({
  title: {
    type: String,
  },
  initials: {
    type: String,
  },
  admin: {
    type: Boolean,
    default: false
  },
  date: {
    type: Date,
    default: Date.now
  },
  creator: {
    type: Schema.Types.ObjectId,
    ref: 'users',
  }
}, {
  timestamps: true
})

module.exports = mongoose.model('roles', rolesSchema)