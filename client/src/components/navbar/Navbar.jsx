import React from "react";
import appStyles from "../../App.module.css";
import { Link } from "react-router-dom";
import navbarStyles from "./navbar.module.css";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";

const Navbar = () => {
  const [navShow, setNavShow] = useState(false);
  const { logout, user } = useAuth();

  const handleNavShow = () => {
    setNavShow(true);
  };

  return (
    <div>
      <header className={`${appStyles.bgWhite} ${navbarStyles.header}`}>
        <nav
          className={`${navbarStyles.navContents} ${appStyles.container} ${navbarStyles.flex2}`}
        >
          <div
            className={`${navbarStyles.navLeftLinks} ${navbarStyles.navTotal} ${navbarStyles.flex} `}
          >
            <Link
              to="/"
              className={`${navbarStyles.mainHover} ${navbarStyles.navRightLink} ${appStyles.textBlack} ${appStyles.noTextDecoration} ${navbarStyles.link}  `}
            >
              Categories
              <i
                className={`${"fa fa-chevron-right"} ${navbarStyles.none}`}
                aria-hidden="true"
              ></i>
            </Link>

            <Link
              to="/"
              className={`${navbarStyles.navRightLink} ${navbarStyles.flex} ${appStyles.textBlack} ${navbarStyles.link} ${appStyles.noTextDecoration}`}
            >
              Look
              <i
                className={`${"fa fa-chevron-right"} ${navbarStyles.none}`}
                aria-hidden="true"
              ></i>
            </Link>
            <Link
              to="/"
              className={`${navbarStyles.navRightLink} ${navbarStyles.flex} ${navbarStyles.none} ${appStyles.textBlack} ${appStyles.noTextDecoration} ${navbarStyles.link}`}
            >
              Women
              <i
                className={`${"fa fa-chevron-right"} ${navbarStyles.none}`}
                aria-hidden="true"
              ></i>
            </Link>
            <Link
              to="/"
              className={`${navbarStyles.navRightLink} ${navbarStyles.flex} ${appStyles.textBlack} ${appStyles.noTextDecoration}  ${navbarStyles.flex} ${navbarStyles.none} ${navbarStyles.link}`}
            >
              Men
              <i
                className={`${"fa fa-chevron-right"} ${navbarStyles.none}`}
                aria-hidden="true"
              ></i>
            </Link>
            <Link
              to="/"
              className={`${navbarStyles.navRightLink} ${navbarStyles.flex} ${appStyles.textBlack} ${appStyles.noTextDecoration}  ${navbarStyles.link} ${navbarStyles.none}`}
            >
              Children
              <i
                className={`${"fa fa-chevron-right"} ${navbarStyles.none}`}
                aria-hidden="true"
              ></i>
            </Link>
          </div>

          <div className={`${navbarStyles.closeBtn} ${appStyles.textCream}`}>
            <i className="fa fa-times" aria-hidden="true"></i>
          </div>

          <h1
            className={`${navbarStyles.navLogo} ${appStyles.textDark} ${appStyles.aladinRegular}`}
          >
            Runway Riot
          </h1>
          <div
            className={`${navbarStyles.navRightIcons} ${navbarStyles.flex} ${navbarStyles.footerIcons}`}
          >
            <Link to="/contact" className={` ${appStyles.noTextDecoration}`}>
              Contact
            </Link>
            {user ? (
              <Link
                onClick={logout}
                className={` ${appStyles.noTextDecoration}`}
              >
                logout
              </Link>
            ) : (
              <>
                <Link
                  to="/register"
                  className={` ${appStyles.noTextDecoration}`}
                >
                  Register
                </Link>
                <Link to="/login" className={` ${appStyles.noTextDecoration}`}>
                  Login
                </Link>
              </>
            )}
          </div>

          <div className={navbarStyles.hambuger} onClick={handleNavShow}>
            <i className="fa fa-bars" aria-hidden="true"></i>
          </div>
        </nav>
      </header>

      <div className={`${navbarStyles.special}`}>
        <a href="#">Trends</a>
        <a href="#">Outfit Inspiration</a>
        <a href="#">Style Guides</a>
        <a href="#" className={`${navbarStyles.longCategory}`}>
          Fashion Tips and Tricks
        </a>
        <a href="#">Street Style</a>
        <a href="#">Lifestyle</a>
        <a href="#">Fashion for All</a>
      </div>
      {/* header ends */}

      <div> {user && <p>{user.email}</p>}</div>
    </div>
  );
};

export default Navbar;
