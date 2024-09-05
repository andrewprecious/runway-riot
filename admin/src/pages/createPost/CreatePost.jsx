import React from "react";
import "./createPost.css";
import axios from "axios";
import { API_URL } from "../../App";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";

const CreatePost = () => {
  const [formData, setFormData] = useState({
    title: "",
    image: "",
    snippet: "",
    body: "",
    category: [],
    topStory: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCategoryChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setFormData((prevData) => ({
        ...prevData,
        category: [...prevData.category, value],
      }));
    }
    // if the checkbox is unchecked
    else {
      setFormData((prevData) => ({
        ...prevData.category.filter((category) => category !== value),
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.category.length === 0) {
      setError("Please select at least one category.");
      return;
    }

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const response = await axios.post(`${API_URL}/blog/createPost`, formData);
      if (response.status === 200) {
        setSuccess("Post created successfully");
      }
    } catch (err) {
      setError("Failed to create post. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="postDiv2">
        <h2>Create Post</h2>
        {error && <p className="error-message">{error}</p>}
        {success && <p className="success-message">{success}</p>}
        <form onSubmit={handleSubmit} className="formContainer">
          <div className="inputForm">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              className="formGroup"
              name="title"
              id="title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>

          <div className="inputForm">
            <label htmlFor="image">Image</label>
            <input
              type="text"
              className="formGroup"
              name="image"
              id="image"
              value={formData.image}
              onChange={handleChange}
              required
            />
          </div>

          <div className="inputForm">
            <label htmlFor="snippet">Snippet</label>
            <input
              type="text"
              className="formGroup"
              name="snippet"
              id="snippet"
              value={formData.snippet}
              onChange={handleChange}
              required
            />
          </div>

          <div className="inputForm">
            <label htmlFor="body">Body</label>
            <textarea
              type="text"
              className="formGroup"
              name="body"
              id="body"
              value={formData.body}
              onChange={handleChange}
              required
            />

            <div className="markdown-preview">
              <h4>Preview:</h4>
              <ReactMarkdown>{formData.body}</ReactMarkdown>
            </div>
          </div>

          <div className="inputForm">
            <label className="checkLabel">category</label>
            <div className="checkboxGroup">
              {["fashion", "music", "football", "basketball"].map((cat) => (
                <label key={cat}>
                  <input
                    type="checkbox"
                    value={cat}
                    checked={formData.category.includes(cat)} // determines whether the checkbox is checked or not based on if the category is included in the formData.category array.
                    onChange={handleCategoryChange} // The function to call when the checkbox is checked or unchecked.
                  />
                  {cat}
                </label>
              ))}
            </div>
          </div>

          <div className="inputForm">
            <label htmlFor="topStory">TopStory</label>
            <select
              name="topStory"
              id="topStory"
              value={formData.topStory}
              onChange={handleChange}
              className="form-control"
              required
            >
              <option value=""></option>
              <option value="yes">yes</option>
              <option value="no">no</option>
            </select>
          </div>

          <button type="submit" disabled={loading}>
            {loading ? "Creating Post..." : "Create Post"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreatePost;
