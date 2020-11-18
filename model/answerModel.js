// Fetch Mongoose module
const mongoose = require('mongoose');

const { Schema } = mongoose;

const AnswerSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'myUser',
  },
  text: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    // required: true,
  },
  date: {
    type: Date,
    Default: Date.now,
  },
  love: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: 'myUser',
      },
    },
  ],
});

module.exports = mongoose.model('myAnswer', AnswerSchema);
