const { Schema, model } = require('mongoose');
const reactionSchema = require('./SecondOpinion');
const dateFormat = require('../utils/dateFormat');

const opinionSchema = new Schema(
  {
    opinionText: {
      type: String,
      required: 'You need to leave a opinion!',
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
    secondOpinions: [reactionSchema]
  },
  {
    toJSON: {
      getters: true, // Ensure getters are applied when converting to JSON
      virtuals: true // Enable virtual fields to be included in the response
    },
    id: false // Prevents the automatic addition of the `id` field in subdocuments
  }
);

// Virtual property to get the number of reactions for the opinion
opinionSchema.virtual('secondOpinionCount').get(function() {
  return this.secondOpinions.length;
});

const Opinion = model('Opinion', opinionSchema);

module.exports = Opinion;
