import Sidebar from "../../components/sidebar/Sidebar";
import "./home.css";
import Navbar from "../../components/navbar/Navbar";
import { useAdminAuth } from "../../context/AdminAuthContext";
import axios from "axios";
import { API_URL } from "../../App";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const Home = () => {
  const [categories, setCategories] = useState([]);
  const [posts, setPosts] = useState([]);

  // fetch categories from backend(api)
  useEffect(() => {
    const getCategories = async () => {
      try {
        const res = await axios.get(`${API_URL}/blog/categoriesLimit6`);
        // console.log(res);
        // console.log(res.data);
        setCategories(res.data); //updates categories
      } catch (err) {
        console.log(err);
      }
    };
    getCategories();
  }, []);

  // fetch posts from backend(api)
  useEffect(() => {
    const getPosts = async () => {
      try {
        const res = await axios.get(`${API_URL}/blog/posts`);
        // console.log(res);
        // console.log(res.data);
        setPosts(res.data); //updates Posts
      } catch (err) {
        console.log(err);
      }
    };
    getPosts();
  }, []);

  // handle category deletion with confirmation
  const handleDeleteCategory = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this category?"
    );
    if (confirmDelete) {
      try {
        await axios.delete(`${API_URL}/blog/deleteCategory/${id}`);
        setCategories(categories.filter((category) => category._id !== id));
        // display all other categories except the one that has been deleted on the UL without refreshing the page
        alert("Category deleted successfully");
      } catch (err) {
        console.log(err);
        alert("Failed to delete the category");
      }
    }
  };

  // handle delete post
  const handleDeletePost = async (id) => {
    const confirmPostDelete = window.confirm(
      "This post will be permanently deleted. Continue?"
    );
    if (confirmPostDelete) {
      try {
        await axios.delete(`${API_URL}/blog/deletePost/${id}`);
        setPosts((prevPosts) => prevPosts.filter((post) => post._id !== id));
        alert("Post deletion completed");
      } catch (err) {
        console.log(err);
        alert("We couldn’t delete the post. Please check and try again");
      }
    }
  };
  const { adminUser } = useAdminAuth();
  return (
    <div className="Home">
      <Sidebar />
      <div className="rightH">
        <Navbar />
        <div className="content">
          {" "}
          <h3 className="h1">Categories</h3>
          <div className="categories">
            {categories.map((category) => (
              <div className="category" key={category._id}>
                <img
                  src={category.image}
                  alt="test image"
                  width="300px"
                  height="300px"
                />

                <p>{category.name}</p>
                <div className="info">
                  <Link to={`/editCategory/${category._id}`}>edit</Link>
                  <Link onClick={() => handleDeleteCategory(category._id)}>
                    delete
                  </Link>
                </div>
              </div>
            ))}
          </div>
          <h3 className="h1">Posts</h3>
          <div className="posts">
            {posts.map((post) => (
              <div className="post" key={post._id}>
                <img
                  src={post.image}
                  alt="test image"
                  width="300px"
                  height="300px"
                />

                <p className="title  Zapfino">{post.title}</p>

                <p className="catChange">
                  {post.category.map((cat, index) => (
                    <span key={index} style={{ marginRight: "5px" }}>
                      {cat}
                    </span>
                  ))}
                </p>

                <div className="allInfo">
                  <p>{post.snippet}</p>
                  <p className="body">{post.body}</p>
                </div>
                <div className="info">
                  <Link to={`/editPost/${post._id}`}>edit</Link>
                  <Link onClick={() => handleDeletePost(post._id)}>delete</Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
