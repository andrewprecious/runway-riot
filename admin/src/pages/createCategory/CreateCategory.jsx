import React from "react";
import "./createCategory.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import { API_URL } from "../../App.jsx";
import axios from "axios";

const CreateCategory = () => {
  const [formData, setFormData] = useState({ name: "", image: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const response = await axios.post(
        `${API_URL}/blog/createCategory`,
        formData
      );
      setSuccess("Category created successfully");
      setFormData({ name: "", image: "" });
    } catch (err) {
      setError("Failed to create category. Please try again");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="cat">
      <div className="catDiv">
        {error && <p className="error-message">{error}</p>}
        {success && <p className="success-message">{success}</p>}
        <form onSubmit={handleSubmit} className="formContainer">
          <h2>Create Category</h2>
          <div className="inputDiv">
            <label htmlFor="name">Category name</label>
            <input
              type="text"
              className="formControl"
              name="name"
              id="name"
              value={formData.name}
              onChange={handleChange}
            />
          </div>
          {/* image */}
          <div className="inputDiv">
            <label htmlFor="image">Category image</label>
            <input
              type="text"
              className="formControl"
              name="image"
              id="image"
              value={formData.image}
              onChange={handleChange}
            />
          </div>
          {/* button */}
          <button type="submit" disabled={loading}>
            {loading ? "Creating..." : "Create Category"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateCategory;
