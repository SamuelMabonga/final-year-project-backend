const mongoose = require('mongoose')

const Schema = mongoose.Schema

const farmerSchema = new Schema({
  firstName: {
      type: String,
      // required: true,
  },
  lastName: {
      type: String,
      // required: true,
  },
  email: {
      type: String,
      unique: true,
      required: true,
      lowercase: true,
      trim: true,
      match: [/\S+@\S+\.\S+/, 'is invalid'],
      index: true
  },
  phoneNumber: {
    type: String,
    unique: true
  },
  gender: {
      type: String
  },
  age: {
      type: String
  },
  village: {
      type: String 
  },
  image: {
      type: String
  },
  location: {
      type: String,
  },
  farms: [
    {
      type: Schema.Types.ObjectId,
      ref: 'farms'
    },
  ], 
  date: {
      type: Date,
      default: Date.now,
  },
  creator: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  }
}, {
  timestamps: true
})

module.exports = mongoose.model('farmers', farmerSchema)