const { Schema, model } = require('mongoose');
const reactionSchema = require('./secondOpinon');
const dateFormat = require('../utils/dateFormat');

const opinionSchema = new Schema(
  {
    opinionText: {
      type: String,
      required: 'You need to leave a thought!',
      minlength: 1,
      maxlength: 280
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: timestamp => dateFormat(timestamp) // Formats the date when queried
    },
    username: {
      type: String,
      required: true
    },
    // Array of nested reactions based on reactionSchema
    reactions: [reactionSchema]
  },
  {
    toJSON: {
      getters: true, // Ensure getters are applied when converting to JSON
      virtuals: true // Enable virtual fields to be included in the response
    },
    id: false // Prevents the automatic addition of the `id` field in subdocuments
  }
);

// Virtual property to get the number of reactions for the thought
opinionSchema.virtual('reactionCount').get(function() {
  return this.reactions.length;
});

const Opinion = model('Opinion', opinionSchema);

module.exports = Opinion;
