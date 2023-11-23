const express = require("express");
const router = express.Router();
const Interaction = require("../models/Interaction");
const Post = require("../models/Post");
const verify = require("../verifyToken.js");

// Action 4: Registered users perform basic operations, including “like”, “dislike”, or “comment” a message posted for a topic.
router.post("/", verify, async (req, res) => {
  try {
    const { postId, value, comment } = req.body;
    const userId = req.user._id;
    const username = req.user.username;

    const post = await Post.findById(postId);

    // Check if the post exists
    if (!post) {
      return res.status(404).json({ error: "Post not found..." });
    }

    // Check if the user is the owner of the post
    if (userId.toString() === post.ownerId.toString()) {
      return res
        .status(400)
        .json({ error: "You cannot like/dislike your own post" });
    }

    // Check if the post is expired
    if (Date.now() > post.expirationTime) {
      post.status = "Expired";
      await post.save();
      return res.status(400).json({ error: "Post is expired..." });
    }

    // Check if the user has already liked or disliked the post
    if (value !== "Comment") {
      const existingInteraction = await Interaction.findOne({
        postId,
        userId,
        value: { $in: ["Like", "Dislike"] },
      });
      if (existingInteraction) {
        return res
          .status(400)
          .json({ error: "You have already liked/disliked this post..." });
      }
    }

    const interaction = new Interaction({
      userId,
      postId,
      username,
      value,
      timestamp: Date.now(),
    });

    if (value === "Comment" && comment) {
      interaction.comment = { username, text: comment, timestamp: Date.now() };
    }

    await interaction.save();

    const update = {};
    if (value === "Like") {
      update.$inc = { likes: 1 };
    } else if (value === "Dislike") {
      update.$inc = { dislikes: 1 };
    } else if (value === "Comment" && comment) {
      update.$push = {
        comments: { username, text: comment, timestamp: Date.now() },
      };
    }

    await Post.findByIdAndUpdate(postId, update);

    res.send({
      message: "Interaction recorded successfully!",
      timeLeft: post.timeLeft,
    });
  } catch (error) {
    res.status(400).send({ message: error });
  }
});

module.exports = router;
