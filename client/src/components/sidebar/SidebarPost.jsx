import appStyles from "../../App.module.css";
import sidebarStyles from "./sidebarPost.module.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { URL } from "../../App";
import { useEffect, useState } from "react";

const SidebarPost = () => {
  const [posts, setPosts] = useState([]);

  // fetch posts
  useEffect(() => {
    const getAllTopStories = async () => {
      try {
        const res = await axios.get(`${URL}/blog/topPosts`);
        // console.log(res.data);
        setPosts(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getAllTopStories();
  }, []);
  return (
    <div className={`${sidebarStyles.sidebar}`}>
      {/* caption */}
      <div className={`${sidebarStyles.captionHead}  ${appStyles.flex}`}>
        <h1
          className={` ${appStyles.robotoBlack} ${appStyles.Georgia} ${appStyles.textBlack}`}
        >
          Top Posts
        </h1>
      </div>

      {/* cards */}
      <div className={`${sidebarStyles.sidebarPosts}`}>
        {/* trending posts */}
        <ul className={sidebarStyles.numberedList}>
          {posts.map((post) => (
            <li
              className={`${sidebarStyles.numberedListItem} ${appStyles.engraversMT} `}
              key={post._id}
            >
              <Link
                to="/"
                className={`${appStyles.robotoBlack} ${sidebarStyles.text} ${appStyles.textBlack} ${appStyles.noTextDecoration}  ${sidebarStyles.linkText}`}
              >
                {post.body}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className={`${sidebarStyles.btnD}`}>
        <Link
          to="#"
          className={`${sidebarStyles.btn} ${appStyles.noTextDecoration}`}
        >
          READ MORE POPULAR POSTS
        </Link>
      </div>
    </div>
  );
};

export default SidebarPost;
