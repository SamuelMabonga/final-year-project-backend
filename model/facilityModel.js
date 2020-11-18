const mongoose = require('mongoose')
const Schema = mongoose.Schema

const facilitySchema = new Schema({
  name: {
    type: String
  },
  inCharge: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  date: {
    type: Date,
    default: Date.now
  },
  registrar: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  dimensions: {
    height: Number,
    width: Number,
    length: Number
  },
  materials: {
    roof: String,
    walls: String,
    floor: String
  },
  history: {
    firstYear: String,
    secondYear: String,
    thirdYear: String,
    fourthYear: String
  }
}, {
  timestamps: true
})

module.exports = mongoose.model('facilities', facilitySchema)