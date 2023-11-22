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

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  topics: [
    {
      type: String,
      enum: ["Politics", "Health", "Sport", "Tech"],
      required: true,
    },
  ],
  timestamp: {
    type: Date,
    default: Date.now,
  },
  body: {
    type: String,
    required: true,
  },
  expirationTime: {
    type: Date,
    default: Date.now() + 15768000000, // 6 months in milliseconds
  },
  status: {
    type: String,
    enum: ["Live", "Expired"],
    default: "Live",
  },
  ownerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  owner: {
    type: String,
    required: true,
  },
  likes: {
    type: Number,
    default: 0,
  },
  dislikes: {
    type: Number,
    default: 0,
  },
  comments: [commentSchema],
});

module.exports = mongoose.model("posts", postSchema);
