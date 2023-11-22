const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

const interactionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  postId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post",
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  value: {
    type: String,
    enum: ["Like", "Dislike", "Comment"],
    required: true,
  },
  comment: commentSchema,
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("interactions", interactionSchema);
