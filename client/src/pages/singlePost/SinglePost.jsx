import React, { useState, useEffect } from "react";
import appStyles from "../../App.module.css";
import SinglePostStyles from "./singlePost.module.css";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import homeStyles from "../home/home.module.css";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";
import { URL } from "../../App";

const SinglePost = () => {
  // Array of image URLs

  const images = [
    { url: "https://shorturl.at/iKWK5", category: "beauty" },
    { url: "https://shorturl.at/iKWK5", category: "beauty" },
    { url: "https://shorturl.at/fMXto", category: "beauty" },
    { url: "https://rb.gy/afbuw3", category: "beauty" },
    { url: "https://rb.gy/f5qvk1", category: "beauty" },
    { url: "https://shorturl.at/IVvtx", category: "clothes" },
    { url: "https://shorturl.at/iKWK5", category: "fashion" },
  ];

  // State for current image index
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [singlePost, setSinglePost] = useState({});
  const [filteredImages, setFilteredImages] = useState([]);

  const location = useLocation();
  // console.log(location);
  // console.log(location.pathname.split("/"));

  const id = location.pathname.split("/")[2];

  useEffect(() => {
    // Set up an interval to change the image every 3 seconds
    const imgSliderInterval = setInterval(() => {
      if (filteredImages.length > 0) {
        setCurrentImageIndex(
          (prevIndex) => (prevIndex + 1) % filteredImages.length
        );
      }
    }, 2000);

    // Clean up the interval on component unmount
    return () => clearInterval(imgSliderInterval);
  }, [filteredImages.length]);

  // get single post
  useEffect(() => {
    const getSinglePost = async () => {
      try {
        const res = await axios.get(`${URL}/blog/singlePost/${id}`);
        // console.log("API Response:", res.data); // Log the response
        // console.log(res.data);
        setLoading(false);
        setSinglePost(res.data);
        // Filter images based on the post category
        const relatedImages = images.filter(
          (img) => img.category === res.data.category[0] // Assuming category is an array and taking the first one for simplicity
        );
        setFilteredImages(relatedImages);
        if (relatedImages.length > 0) {
          setCurrentImageIndex(0); // Reset the index if there are images
        }
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    };
    getSinglePost();
  }, [id]);

  return (
    <div>
      {/* navbar */}
      <Navbar />
      <section
        className={`${homeStyles.recent} ${appStyles.bgCream} ${SinglePostStyles.alignCenter} ${appStyles.myBlogDesign} `}
      >
        {/* (left side) */}
        <div className={`${appStyles.noTextDecoration}  `}>
          <div className={`${homeStyles.card}`}>
            {/* caption post */}
            <div className={`${homeStyles.captionPost} ${appStyles.flex}`}>
              <h1
                className={` ${appStyles.textBlack} ${appStyles.Georgia} ${SinglePostStyles.fontSmall}`}
              >
                {loading ? "Loading..." : singlePost.title}
              </h1>
            </div>

            {/* card (for single post) */}
            {loading ? (
              "loading..."
            ) : (
              <div>
                <Link className={`${appStyles.noTextDecoration} `}>
                  <div className={`${SinglePostStyles.imgDesign}`}>
                    {" "}
                    <img
                      src={singlePost.image}
                      alt="pic"
                      className={`${SinglePostStyles.rightImg} `}
                    />
                  </div>
                  <div
                    className={`${SinglePostStyles.heading}  ${appStyles.textBlack}  ${appStyles.Zapfino}`}
                  >
                    {singlePost.title}
                  </div>
                  <div
                    className={`${homeStyles.cardInfo} ${homeStyles.flexCardInfo} `}
                  >
                    <p>
                      {Array.isArray(singlePost.category) &&
                      singlePost.category.length > 0 ? (
                        singlePost.category.map((cat, index) => (
                          <span key={index} style={{ marginRight: "8px" }}>
                            {cat}
                          </span>
                        ))
                      ) : (
                        <span>No categories available</span>
                      )}
                    </p>
                    <p>
                      {" "}
                      {new Date(singlePost.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div
                    className={`${SinglePostStyles.subHeading}  ${appStyles.textBlack} ${appStyles.Alex}`}
                  >
                    {singlePost.snippet}
                  </div>
                  <div
                    className={`${SinglePostStyles.title}   ${appStyles.textBlack} ${appStyles.mrg10} ${SinglePostStyles.fontSmaller}`}
                  >
                    {singlePost.body}
                  </div>
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* sidebar (first side) */}
        <div className={`${appStyles.noTextDecoration}`}>
          {/* caption post */}
          <div>
            <h1
              className={` ${appStyles.textBlack} ${appStyles.Georgia} ${SinglePostStyles.mrg15} ${SinglePostStyles.fontSma}`}
            >
              Discover Similar Styles
            </h1>
          </div>

          {/* Sidebar Image Slider */}
          <div className={`${SinglePostStyles.sidebarImageSlider}`}>
            {filteredImages.length > 0 ? (
              <img
                src={filteredImages[currentImageIndex]?.url}
                alt="Sidebar"
                style={{ width: "100%", height: "auto" }}
                className={`${SinglePostStyles.sidebarImg}`}
              />
            ) : (
              <p>No similar images available</p>
            )}
          </div>
        </div>
      </section>

      {/* footer */}
      <Footer />
    </div>
  );
};

export default SinglePost;
