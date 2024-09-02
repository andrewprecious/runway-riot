import { useEffect, useState } from "react";
import appStyles from "../../App.module.css";
import Footer from "../../components/footer/Footer";
import homeStyles from "../home/home.module.css";
import Navbar from "../../components/navbar/Navbar";
import { Link, useLocation } from "react-router-dom";
import SidebarPost from "../../components/sidebar/SidebarPost";
import axios from "axios";
import { URL } from "../../App";

const CategoryContent = () => {
  const location = useLocation();
  const category = location.pathname.split("/")[2];
  //   const { id } = useParams(); // Get category from URL params
  const [posts, setPosts] = useState([]);
  const [recentPosts, setRecentPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // getpost under category
  useEffect(() => {
    const getPostsUnderCategory = async () => {
      try {
        const res = await axios.get(`${URL}/blog/posts/category/${category}`);
        // console.log(res.data);
        setLoading(false);
        setPosts(res.data);
      } catch (err) {
        console.log(err);
        setLoading(false);
        if (err.response && err.response.status === 404) {
          setError(err.response.data.message);
        }
      }
    };
    getPostsUnderCategory();
  }, [category]);

  // fetch recent posts
  useEffect(() => {
    const getRecentPosts = async () => {
      try {
        const res = await axios.get(`${URL}/blog/postsLimit6`);
        console.log(res.data);
        setRecentPosts(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getRecentPosts();
  }, []);

  return (
    <div>
      <Navbar />

      {/* third sec starts */}
      <section
        className={`${homeStyles.recent} ${appStyles.bgCream} ${appStyles.myBlogDesign}`}
      >
        {/* cards */}
        <div className={`${appStyles.noTextDecoration}`}>
          <div className={`${homeStyles.card}  `}>
            {/* caption for get post under categories*/}
            <div className={`${homeStyles.captionPost} ${appStyles.flex}`}>
              <h1 className={` ${appStyles.textBlack} `}>
                Posts under {category}
              </h1>

              <Link
                to="/"
                className={`${appStyles.noTextDecoration} ${homeStyles.viewAll} ${appStyles.robotoRegularItalic}`}
              >
                View all
              </Link>
            </div>

            {loading ? (
              <p>Loading, please wait...</p>
            ) : error ? (
              <p>{error}</p>
            ) : (
              <div className={`${appStyles.gridColumn2}`}>
                {/* first card */}{" "}
                {posts.map((post) => (
                  <Link
                    className={`${appStyles.noTextDecoration}`}
                    to={`/post/${post._id}`}
                    key={post._id}
                  >
                    {" "}
                    <div className={`${homeStyles.firstCard} `}>
                      <img
                        src={post.image}
                        width="400px"
                        height="350px"
                        alt="pic"
                      />
                      <div
                        className={`${homeStyles.cardInfo} ${homeStyles.flexCardInfo}`}
                      >
                        <p className={`${appStyles.poppinsExtraLightItalic} `}>
                          {post.category.map((name, index) => (
                            <span key={index} style={{ marginRight: "5px" }}>
                              {name}
                            </span>
                          ))}
                        </p>
                        <p> {new Date(post.createdAt).toLocaleDateString()}</p>
                      </div>
                      <Link
                        to="/"
                        className={`${homeStyles.blogText} ${appStyles.robotoBlack} ${appStyles.textBlack}`}
                      >
                        {post.title}
                      </Link>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* caption for recent post */}
          <div className={`${homeStyles.captionPost} ${appStyles.flex}`}>
            <h1 className={` ${appStyles.textBlack} `}> Recent posts(10)</h1>

            <Link
              to="/"
              className={`${appStyles.noTextDecoration} ${homeStyles.viewAll} ${appStyles.robotoRegularItalic}`}
            >
              View all
            </Link>
          </div>

          <div className={`${appStyles.gridColumn2} `}>
            <Link className={`${appStyles.noTextDecoration}`}>
              {/* first card */}
              {recentPosts.map((post) => (
                <div className={`${homeStyles.firstCard} `} key={post._id}>
                  <img
                    src={post.image}
                    width="400px"
                    height="350px"
                    alt="pic"
                  />
                  <div
                    className={`${homeStyles.cardInfo} ${homeStyles.flexCardInfo}`}
                  >
                    <p className={`${appStyles.poppinsExtraLightItalic} `}>
                      {post.category[0]}
                    </p>
                    <p> {new Date(post.createdAt).toLocaleDateString()}</p>
                  </div>
                  <Link
                    to="/"
                    className={`${homeStyles.blogText} ${appStyles.robotoBlack} ${appStyles.textBlack}`}
                  >
                    {post.title}
                  </Link>
                </div>
              ))}
            </Link>
          </div>
        </div>
        {/* side bar card */}
        <div>
          <SidebarPost />
        </div>
      </section>
      {/* third sec ends */}
      <Footer />
    </div>
  );
};

export default CategoryContent;
