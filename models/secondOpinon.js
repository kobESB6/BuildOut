const { Schema, Types } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const secondOpinionSchema = new Schema(
  {
    secondOpinionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(), // Automatically generates an ObjectId
    },
    secondOpinionBody: {
      type: String,
      required: true,
      maxlength: 280, // Reactions can have a max length of 280 characters
    },
    username: {
      type: String,
      required: true, // Username of the person who reacted
    },
    createdAt: {
      type: Date,
      default: Date.now, // Default to current time
      get: (timestamp) => dateFormat(timestamp), // Formats the timestamp using dateFormat function
    },
  },
  {
    toJSON: {
      getters: true, // Ensures getters like dateFormat are applied when JSON is returned
    },
    id: false, // Disables the default `_id` field for subdocuments
  }
);

module.exports = SecondOpinionSchema;
