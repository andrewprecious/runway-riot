import "./editPost.css";
import axios from "axios";
import { API_URL } from "../../App";
import { useLocation, useNavigate } from "react-router-dom";

const EditPosts = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const id = location.pathname.split("/")[2];

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

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`${API_URL}/blog/post/${id}`);
        setFormData({
          title: response.data.title,
          image: response.data.image,
          snippet: response.data.snippet,
          body: response.data.body,
          category: response.data.category || [],
          topStory: response.data.topStory || "",
        });
      } catch (err) {
        setError("Failed to load post data.");
        console.error("Fetch post error:", err);
      }
    };
    fetchPost();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleCategoryChange = (e) => {
    const { value, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      category: checked
        ? [...prevData.category, value]
        : prevData.category.filter((category) => category !== value),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");
    try {
      const response = await axios.put(
        `${API_URL}/blog/editPost/${id}`,
        formData
      );
      if (response.status === 200) {
        setSuccess("Post updated successfully");
        navigate("/"); // Navigate to the list of posts after update
      }
    } catch (err) {
      setError("Failed to update post. Please try again.");
      console.error("Update post error:", err);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="editPostContainer">
      <h2>Edit Post</h2>
      {error && <p className="error-message">{error}</p>}
      {success && <p className="success-message">{success}</p>}
      <form className="formContainer" onSubmit={handleSubmit}>
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
          <label htmlFor="image">Image URL</label>
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
            className="formGroup"
            name="body"
            id="body"
            value={formData.body}
            onChange={handleChange}
            required
          />
        </div>

        <div className="inputForm">
          <label>Category</label>
          <div className="checkbox-group">
            {["fashion", "music", "football", "basketball"].map((cat) => (
              <label key={cat}>
                <input
                  type="checkbox"
                  value={cat}
                  checked={formData.category.includes(cat)}
                  onChange={handleCategoryChange}
                />
                {cat}
              </label>
            ))}
          </div>
        </div>

        <div className="inputForm">
          <label htmlFor="topStory">Top Story</label>
          <select
            id="topStory"
            name="topStory"
            value={formData.topStory}
            onChange={handleChange}
            className="form-control"
          >
            <option value="">Select</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </div>

        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? "Updating Post..." : "Update Post"}
        </button>
      </form>
    </div>
  );
};

export default EditPosts;
