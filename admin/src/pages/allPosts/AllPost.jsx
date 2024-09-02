import { useState, useEffect } from "react";
import "./allPost.css";
import { Link } from "react-router-dom";
import { API_URL } from "../../App.jsx";
import axios from "axios";
import Sidebar from "../../components/sidebar/Sidebar";

const AllPost = () => {
  const [posts, setPosts] = useState([]);

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

  // Handle delete post
  const handleDeletePost = async (id) => {
    const confirmPostDelete = window.confirm(
      "This post will be permanently deleted. Continue?"
    );
    if (confirmPostDelete) {
      try {
        console.log(`Attempting to delete post with id: ${id}`);
        await axios.delete(`${API_URL}/blog/deletePost/${id}`);
        setPosts((prevPosts) => prevPosts.filter((post) => post._id !== id));
        alert("Post deletion completed");
      } catch (err) {
        console.log("Error deleting post:", err);
        alert("We couldn’t delete the post. Please check and try again");
      }
    }
  };
  return (
    <div className="g">
      <div className="left">
        <Sidebar />
      </div>
      <div className="right">
        <div className="home">
          <Link to="/" className="homeLink">
            Runway Riot
          </Link>
        </div>
        <h1>Post</h1>
        <div className="grid">
          {posts.map((post) => (
            <div className="post" key={post._id}>
              <img
                src={post.image}
                alt="test image"
                width="300px"
                height="300px"
              />

              <p className="title ">{post.title}</p>

              <p>
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
  );
};

export default AllPost;
