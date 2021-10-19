const { Schema, model, Types } = require("mongoose");
const dateFormat = require("../utils/dateFormat");
const ThoughtSchema = new Schema({
  thoughtText: {
    type: String,
    required: true,
    min: 1,
    max: 280,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (val) => dateFormat(val),
  },
  username: {
    type: String,
    required: true,
  },
  // use ReactionSchema to validate data for a raction
  reactions: [ReactionSchema],
});

const ReactionSchema = new Schema({
  reactionId: {
    type: Schema.Types.ObjectId,
    default: () => new Types.ObjectId(),
  },
  reactionBody: {
    type: String,
    required: true,
    min: 1,
    max: 280,
  },
  username: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (val) => dateFormat(val),
  },
});
