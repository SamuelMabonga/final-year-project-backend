const mongoose = require('mongoose');

const { Schema } = mongoose;

const QuestionSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'myUser',
  },
  textone: {
    type: String,
    required: true,
  },
  texttwo: {
    type: String,
    required: true,
  },
  name: {
    type: String,
  },
  upvotes: [
    {
      id: {
        type: Schema.Types.ObjectId,
        ref: 'myUser',
      },
    },
  ],
  answers: [
    {
      id: {
        type: Schema.Types.ObjectId,
        ref: 'myAnswer',
      },
    },
  ],
  acceptedAnswer: {
    id: {
      type: Schema.Types.ObjectId,
      ref: 'myAnswer',
    },
  },
  date: {
    type: Date,
    Default: Date.now,
  },
});

module.exports = mongoose.model('myQuestion', QuestionSchema);
