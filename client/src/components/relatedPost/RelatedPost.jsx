import appStyles from "../../App.module.css";
import { Link } from "react-router-dom";
import sidebarStyles from "../sidebar/sidebarPost.module.css";
// import relatedPostStyle from "./related.module.css";

const RelatedPost = () => {
  return (
    <div>
      <div className={`${sidebarStyles.sidebar}`}>
        {/* caption */}
        <div className={`${sidebarStyles.captionPost} ${appStyles.flex}`}>
          <h1 className={` ${appStyles.robotoBlack} ${appStyles.textBlack} `}>
            Related Posts
          </h1>
        </div>

        {/* cards */}
        <div className={`${sidebarStyles.sidebarPosts}`}>
          {/* trending posts */}
          <div className={`${sidebarStyles.trendingPost} `}>
            <img
              src="./images/20240601_015402-COLLAGE.jpg"
              width="40px"
              height="50px"
              alt="pic"
            />
            <div className={`${sidebarStyles.personal}`}>
              {" "}
              <div
                className={`${sidebarStyles.cardInfo} ${sidebarStyles.flexCardInfo}`}
              >
                <p className={`${sidebarStyles.poppinsExtraLightItalic} `}>
                  Fashion
                </p>
                <p>27-07-2024</p>
              </div>
              <Link
                to="/"
                className={` ${appStyles.robotoBlack} ${appStyles.textBlack}`}
              >
                Fashion trends for different ages
              </Link>
            </div>
          </div>

          <div className={`${sidebarStyles.trendingPost} `}>
            <img
              src="./images/20240601_015402-COLLAGE.jpg"
              width="40px"
              height="50px"
              alt="pic"
            />
            <div className={`${sidebarStyles.personal}`}>
              {" "}
              <div
                className={`${sidebarStyles.cardInfo} ${sidebarStyles.flexCardInfo}`}
              >
                <p className={`${sidebarStyles.poppinsExtraLightItalic} `}>
                  Fashion
                </p>
                <p>27-07-2024</p>
              </div>
              <Link
                to="/"
                className={` ${appStyles.robotoBlack} ${appStyles.textBlack}`}
              >
                Runway to Real life
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RelatedPost;
