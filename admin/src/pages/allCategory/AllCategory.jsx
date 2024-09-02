import { useState, useEffect } from "react";
import "./allCatgeory.css";
import { Link } from "react-router-dom";
import { API_URL } from "../../App.jsx";
import axios from "axios";
import Sidebar from "../../components/sidebar/Sidebar";

const AllCategory = () => {
  const [categories, setCategories] = useState([]);

  // fetch categories from backend(api)
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(`${API_URL}/blog/categories`);

        const data = await response.json();
        if (Array.isArray(data)) {
          setCategories(data);
        } else {
          console.error("Data fetched is not an array:", data);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div className="app">
      <div>
        <Sidebar />
      </div>

      <div className="head">
        <div>
          <h1>Categories</h1>
        </div>
        <div className="grid">
          {categories.map((category) => (
            <div className="cats" key={category._id}>
              <img src={category.image} alt="" width="300px" />
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
      </div>
    </div>
  );
};

export default AllCategory;
