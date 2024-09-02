const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    image: {
      type: String,
      required: true,
    },

    snippet: {
      type: String,
      required: true,
    },

    body: {
      type: String,
      required: true,
    },

    category: {
      type: [String], // Explicitly define array of strings
      default: [], // Default to empty array
    },

    topStory: {
      type: String,
    },
  },
  { timestamps: true }
);

const Post = mongoose.model("post", postSchema);

module.exports = Post;
