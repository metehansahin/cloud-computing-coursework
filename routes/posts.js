const express = require("express");
const router = express.Router();
const Post = require("../models/Post");
const Interaction = require("../models/Interaction");
const verify = require("../verifytoken");

// Action 2: Authorised users post a message for a particular topic in the Piazza API.
router.post("/", verify, async (req, res) => {
  try {
    const { title, topics, body } = req.body;

    const newPost = new Post({
      title,
      topics,
      body,
      ownerId: req.user._id,
      owner: req.user.username,
    });

    const savedPost = await newPost.save();

    res.send(savedPost);
  } catch (error) {
    res.status(400).send({ message: error });
  }
});

// Action 3: Registered users browse messages per topic using the Piazza API.
router.get("/:topic", verify, async (req, res) => {
  try {
    const topic = req.params.topic;
    const posts = await Post.find({ topics: topic });
    res.send(posts);
  } catch (error) {
    res.status(400).send({ message: error });
  }
});

// Action 4: Registered users perform basic operations, including “like”, “dislike”, or “comment” a message posted for a topic.
// In this case, the route is specific to handling comments.
router.post("/:postId/comments", verify, async (req, res) => {
  try {
    const { text } = req.body;
    const postId = req.params.postId;
    const userId = req.user._id;
    const username = req.user.username;

    const interaction = new Interaction({
      userId,
      postId,
      username,
      value: "Comment",
      timestamp: Date.now(),
    });

    // Create the comment object
    const comment = { username, text, timestamp: Date.now() };
    interaction.comment = comment;

    await interaction.save();

    // Update the post with the new comment
    await Post.findByIdAndUpdate(postId, { $push: { comments: comment } });

    res.send({ message: "Comment added successfully!" });
  } catch (error) {
    res.status(400).send({ message: error });
  }
});

// Action 4: Registered users perform basic operations, including “like”, “dislike”, or “comment” a message posted for a topic.
// In this case, the route is specific to getting comments for a post.
router.get("/:postId/comments", verify, async (req, res) => {
  try {
    const postId = req.params.postId;
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ error: "Post not found..." });
    }

    const comments = post.comments;
    res.send(comments);
  } catch (error) {
    res.status(400).send({ message: error });
  }
});

// Action 5: Authorised users could browse for the most active post per topic with the highest likes and dislikes.
router.get("/:topic/most-active", verify, async (req, res) => {
  try {
    const topic = req.params.topic;
    const mostActivePost = await Post.findOne({ topics: topic, status: "Live" })
      .sort({ likes: -1, dislikes: -1 })
      .limit(1);
    res.send(mostActivePost);
  } catch (error) {
    res.status(400).send({ message: error });
  }
});

// Action 6: Authorised users could browse the history data of expired posts per topic.
router.get("/:topic/history", verify, async (req, res) => {
  try {
    const topic = req.params.topic;
    const expiredPosts = await Post.find({ topics: topic, status: "Expired" });
    res.send(expiredPosts);
  } catch (error) {
    res.status(400).send({ message: error });
  }
});

module.exports = router;
