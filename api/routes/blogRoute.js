const express = require("express");
const router = express.Router();

const { verifyTokenAndAdmin } = require("../controllers/verifyToken");

const {
  getAllCategory,
  createCategory,
  editCategory,
  deleteCategory,
  getAllPost,
  createPost,
  editPost,
  getSinglePost,
  deletePost,
  getAllCategoryLimit6,
  getAllPostLimit6,
  getTopPosts,
  getAllPostUnderCategory,
  getSingleCategory,
} = require("../controllers/blog_controller");

// categories routes
router.get("/categories", getAllCategory);
router.get("/singleCategory/:categoryId", getSingleCategory);
router.get("/categoriesLimit6", getAllCategoryLimit6);
router.post("/createCategory", createCategory);
router.put("/editCategory/:categoryId", editCategory);
router.delete(
  "/deleteCategory/:categoryId",

  deleteCategory
);

// posts routes
router.get("/posts", getAllPost);
router.get("/postsLimit6", getAllPostLimit6);
router.get("/posts/category/:category", getAllPostUnderCategory);
router.get("/topPosts", getTopPosts);
router.post("/createPost", createPost);
router.put("/editPost/:postId", editPost);
router.get("/singlePost/:postId", getSinglePost);
router.delete("/deletePost/:postId", deletePost);

module.exports = router;
