const Category = require("../models/categories_model");
const Post = require("../models/posts_model");
const mongoose = require("mongoose");

const getAllCategory = async (req, res) => {
  try {
    const categories = await Category.find().sort({ createdAt: -1 });
    res.status(200).json(categories);
  } catch (err) {
    console.log(err);
  }
};

const getSingleCategory = async (req, res) => {
  try {
    const id = req.params.categoryId; // Ensure this matches your frontend route parameter
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ message: "Invalid category id" });
    }

    const category = await Category.findById(id);
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }
    res.status(200).json(category);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "internal server error" });
  }
};

// posts under category
const getAllPostUnderCategory = async (req, res) => {
  try {
    // console.log(`Fetching posts for category: ${req.params.category}`); // Debug log
    const categoryName = req.params.category;
    const posts = await Post.find({ category: categoryName }).sort({
      createdAt: -1,
    });
    if (posts.length === 0) {
      return res
        .status(404)
        .json({ message: "opps.. No posts under this category" });
    }
    // console.log("Posts found:", posts); // Debug log
    res.status(200).json(posts);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "internal server error" });
  }
};

// category limit6
const getAllCategoryLimit6 = async (req, res) => {
  try {
    const categories = await Category.find().sort({ createdAt: -1 }).limit(6);
    res.status(200).json(categories);
  } catch (err) {
    console.log(err);
  }
};

const createCategory = async (req, res) => {
  try {
    // building a new category based on what was written in the req. body
    const newCategory = new Category(req.body);

    // await the newCategory(its saving to the database)
    const savedCategory = await newCategory.save();

    // res.status(200){saying everything is okay} and (json(savedCategory){saying you can show it to whoever wants to see it})
    res.status(200).json(savedCategory);
  } catch (err) {
    console.log(err);
    res.status(200).json({ message: "Internal Server Error" });
  }
};

const editCategory = async (req, res) => {
  try {
    const id = req.params.categoryId; // extracts the id from a request parameter
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ message: "Invalid category id" }); // checks if id is a valid mongodb object (id)
    }

    // update the user
    modifiedCategory = await Category.findByIdAndUpdate(
      id, // the objectId in mongodb
      { $set: req.body }, // update the fields specified in the req.body
      { new: true } // make sure to retuen the new(updated file) and not the original one
    );

    if (!modifiedCategory) {
      return res.status(404).json({ message: "Category not found" }); // if the catgroy with the id is not found (probably deleted category)
    }

    // send the updated category to be visible to user
    res.status(200).json(modifiedCategory);
  } catch (err) {
    console.log(err);
  }
};

const deleteCategory = async (req, res) => {
  try {
    const id = req.params.categoryId; // extracts the id from a request parameter
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ message: "Invalid category id" }); // checks if id is a valid mongodb object (id)
    }

    category = await Category.findByIdAndDelete(id);
    if (!category) {
      return res.status(404).json({ message: "Category not found" }); // if the catgroy with the id is not found (probably deleted category)
    }
    res.status(200).json({ message: "Category has been deleted" });
  } catch (err) {
    console.log(err);
  }
};

// posts
const getAllPost = async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.status(200).json(posts);
  } catch (err) {
    console.log(err);
  }
};

// posts limit6
const getAllPostLimit6 = async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 }).limit(6);
    res.status(200).json(posts);
  } catch (err) {
    console.log(err);
  }
};

// top stories
const getTopPosts = async (req, res) => {
  try {
    const posts = await Post.find({ topStory: "yes" })
      .sort({ createdAt: -1 })
      .limit(10);
    res.status(200).json(posts);
  } catch (err) {
    console.log(err);
  }
};

const createPost = async (req, res) => {
  try {
    // building a new post based on what was written in the req. body
    const newPost = new Post(req.body);

    // await the newPost(its saving to the database)
    const savedPost = await newPost.save();

    // res.status(200){saying everything is okay} and (json(savedCategory){saying you can show it to whoever wants to see it})
    res.status(200).json(savedPost);
  } catch (err) {
    console.log(err);
    res.status(200).json({ message: "Internal Server Error" });
  }
};

const editPost = async (req, res) => {
  try {
    const id = req.params.postId; // extracts the id from a request parameter
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ message: "Invalid post id" }); // checks if id is a valid mongodb object (id)
    }

    // update the user
    modifiedPost = await Post.findByIdAndUpdate(
      id, // the objectId in mongodb
      { $set: req.body }, // update the fields specified in the req.body
      { new: true } // make sure to retuen the new(updated file) and not the original one
    );

    if (!modifiedPost) {
      return res.status(404).json({ message: "Post not found" }); // if the post with the id is not found (probably deleted post)
    }

    // send the updated post to be visible to user
    res.status(200).json(modifiedPost);
  } catch (err) {
    console.log(err);
  }
};

const getSinglePost = async (req, res) => {
  try {
    const id = req.params.postId; // extracts the id from a request parameter
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ message: "Invalid post id" }); // checks if id is a valid mongodb object (id)
    }

    post = await Post.findById(id);
    if (!post) {
      return res.status(404).json({ message: "Post not found" }); // if the post with the id is not found (probably deleted post)
    }
    res.status(200).json(post);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "internal server error" });
  }
};

const deletePost = async (req, res) => {
  try {
    const id = req.params.postId; // extracts the id from a request parameter
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ message: "Invalid post id" }); // checks if id is a valid mongodb object (id)
    }

    post = await Post.findByIdAndDelete(id);
    if (!post) {
      return res.status(404).json({ message: "Post not found" }); // if the post with the id is not found (probably deleted post)
    }
    res.status(200).json({ message: "Post has been deleted" });
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  getAllCategory,
  createCategory,
  editCategory,
  deleteCategory,
  getAllPost,
  getSinglePost,
  createPost,
  editPost,
  deletePost,
  getAllCategoryLimit6,
  getAllPostLimit6,
  getTopPosts,
  getAllPostUnderCategory,
  getSingleCategory,
};
