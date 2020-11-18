const mongoose = require('mongoose')
const Schema = mongoose.Schema

const farmSchema = new Schema({
  name: {
    type: String,
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  village: {
    type: String
  },
  animals: [
    {
      name: String,
      number: Number,
      organic: Boolean,
      comments: String
    },
  ],
  permanentCrops: [
    {
      name: String,
      acreage: Number,
      quantity: Number,
      datePlanted: Date,
      estYield: Number,
      lastChemicalUse: Date,
      organic: Boolean,
      comments: String
    },
  ],
  annualCrops: [
    {
      name: String,
      acreage: Number,
      quantity: Number,
      lastChemicalUse: Date,
      organic: Boolean,
      comments: String
    },
  ],
  history: {
    firstYear: { 
      crop: String,
      organic: Boolean
    },
    secondYear: { 
      crop: String,
      organic: Boolean
    },
    thirdYear: { 
      crop: String,
      organic: Boolean
    },
    fourthYear: { 
      crop: String,
      organic: Boolean
    }
  }, 
  generalComments: {
    type: String,
  },
  location: {
    type: String,
  },
  creator: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
}, {
  timestamps: true
})

module.exports = mongoose.model('farms', farmSchema)