import footerStyles from "./footer.module.css";
import appStyles from "../../App.module.css";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const Footer = () => {
  const [categories, setCategories] = useState([]);

  // fetch categories
  useEffect(() => {
    const getAllCategories = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5001/blog/categoriesLimit6"
        );
        // console.log(res.data);
        setCategories(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getAllCategories();
  }, []);

  return (
    <div>
      <footer className={`${footerStyles.footer} `}>
        <div className={`${appStyles.gridColumn3}`}>
          {" "}
          <div className={`${footerStyles.top}`}>
            <div className={`${footerStyles.icons}`}>
              {" "}
              <i className={`${"fa fa-twitter"} `} aria-hidden="true"></i>
              <i className={`${"fa fa-twitter"} `} aria-hidden="true"></i>
              <i className={`${"fa fa-twitter"} `} aria-hidden="true"></i>
              <i className={`${"fa fa-twitter"} `} aria-hidden="true"></i>
              <i className={`${"fa fa-twitter"} `} aria-hidden="true"></i>
              <i className={`${"fa fa-twitter"} `} aria-hidden="true"></i>
              <i className={`${"fa fa-twitter"} `} aria-hidden="true"></i>
              <i className={`${"fa fa-twitter"} `} aria-hidden="true"></i>
              <i className={`${"fa fa-twitter"} `} aria-hidden="true"></i>
              <i className={`${"fa fa-twitter"} `} aria-hidden="true"></i>
              <i className={`${"fa fa-twitter"} `} aria-hidden="true"></i>
              <i className={`${"fa fa-twitter"} `} aria-hidden="true"></i>
              <i className={`${"fa fa-twitter"} `} aria-hidden="true"></i>
              <i className={`${"fa fa-twitter"} `} aria-hidden="true"></i>
              <i className={`${"fa fa-twitter"} `} aria-hidden="true"></i>
              <i className={`${"fa fa-twitter"} `} aria-hidden="true"></i>
              <i className={`${"fa fa-twitter"} `} aria-hidden="true"></i>
              <i className={`${"fa fa-twitter"} `} aria-hidden="true"></i>
            </div>
          </div>
          {/* categories */}
          <Link
            to="/"
            className={`${footerStyles.middle} ${appStyles.noTextDecoration}`}
          >
            <h1>Categories</h1>
            {categories.map((category) => (
              <div key={category._id}>
                <p>{category.name}</p>
              </div>
            ))}
          </Link>
          {/* copyright */}
          <div className={`${footerStyles.last}`}>
            <Link className={`${footerStyles.lastIcon}`}>
              <i className="fa fa-facebook" aria-hidden="true"></i>
              <i className="fa fa-instagram" aria-hidden="true"></i>
              <i className="fa fa-twitter" aria-hidden="true"></i>
              <i className="fa fa-youtube" aria-hidden="true"></i>
              <i className="fa fa-search" aria-hidden="true"></i>
            </Link>

            <div className={`${footerStyles.copyrightInfo}`}>
              {" "}
              <p>Copyright@</p>
              <p>Follow us +</p>
            </div>
            <div className={`${footerStyles.search}`}>
              {" "}
              <input
                type="text"
                name="search"
                id="search"
                placeholder="Search"
              />
              <i className="fa fa-search" aria-hidden="true"></i>
            </div>
          </div>
        </div>

        <h1
          className={`${footerStyles.navLogo}  ${appStyles.textDark} ${appStyles.aladinRegular}`}
        >
          Runway Riot
        </h1>
      </footer>
    </div>
  );
};

export default Footer;
