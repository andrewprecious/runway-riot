import { useEffect, useState } from "react";
import appStyles from "../../App.module.css";
import contactStyles from "./contact.module.css";
// import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import axios from "axios";
import { URL } from "../../App";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [responseMessage, setResponseMessage] = useState("");

  // handlechange
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // handlesubmit
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(`${URL}/account/send-message`, formData, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      // Check if the response is okay (status code 200-299)
      setResponseMessage(res.data.message || "Message sent successfully!");
    } catch (error) {
      // Handle errors
      setResponseMessage("Failed to send message. Please try again.");
      console.error("Error sending message:", error);
    }
  };

  useEffect(() => {
    document.title = "Runway Riot | Contact Page";

    // cleanup function to remove className when page unmounts
  }, []);
  return (
    <div>
      <section className={`${contactStyles.contactPageSec}`}>
        <h1>Get In Touch</h1>
        <form
          className={`${contactStyles.formContainer}`}
          onSubmit={handleSubmit}
        >
          <label htmlFor="name">Name</label>
          <input
            type="text"
            placeholder="Enter Your Fullname"
            name="name"
            placeholder="Enter Your Fullname"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <label htmlFor="email">Email</label>
          <input
            type="text"
            placeholder="Enter Your Email"
            name="email"
            placeholder="Enter Your Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <label htmlFor="message">Leave a message</label>
          <textarea
            name="message"
            id="message"
            value={formData.message}
            onChange={handleChange}
            required
          ></textarea>
          {/* btn */}
          <button type="submit">Send Message</button>
        </form>
        {responseMessage && <p>{responseMessage}</p>}
      </section>

      <Footer />
    </div>
  );
};

export default Contact;
