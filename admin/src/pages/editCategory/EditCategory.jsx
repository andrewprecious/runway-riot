import React from "react";
import "./editCategory.css";
import axios from "axios";
import { API_URL } from "../../App";
import { useLocation, Link } from "react-router-dom";
import { useState, useEffect } from "react";

const EditCategory = () => {
  const location = useLocation();
  const id = location.pathname.split("/")[2]; // grabs category id

  const [formData, setFormData] = useState({ name: "", image: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    // fetch the existing category data
    const fetchCategory = async () => {
      try {
        const response = await axios.get(
          `${API_URL}/blog/singleCategory/${id}`
        );
        console.log(response);
        setFormData({ name: response.data.name, image: response.data.image });
      } catch (err) {
        setError("Failed to load category data");
      }
    };

    fetchCategory();
  }, [id]);

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
      const response = await axios.put(
        `${API_URL}/blog/editCategory/${id}`,
        formData
      );
      setSuccess("Category updated successfully!");
    } catch (err) {
      setError("Failed to create update. Please try again");
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
          <h2>Edit Category</h2>
          <div className="inputDiv">
            <label htmlFor="name">Category name</label>
            <input
              type="text"
              className="formControl"
              name="name"
              id="name"
              value={formData.name}
              onChange={handleChange}
              required
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
              required
            />
          </div>
          {/* button */}
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? "Saving Changes..." : "Edit Category"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditCategory;
