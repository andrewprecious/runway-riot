import { useEffect, useState } from "react";
import appStyles from "../../App.module.css";
import Footer from "../../components/footer/Footer";
import homeStyles from "./home.module.css";
import Navbar from "../../components/navbar/Navbar";
import { Link, useLocation } from "react-router-dom";
import SidebarPost from "../../components/sidebar/SidebarPost";
import axios from "axios";
import { URL } from "../../App";

const Home = () => {
  const [categories, setCategories] = useState([]);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    document.title = "Runway Riot | Home Page";
  });

  // fetch categories
  useEffect(() => {
    const getAllCategories = async () => {
      try {
        const res = await axios.get(`${URL}/blog/categoriesLimit6`);
        // console.log(res.data);
        setCategories(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getAllCategories();
  }, []);

  // fetch posts
  useEffect(() => {
    const getAllPosts = async () => {
      try {
        const res = await axios.get(`${URL}/blog/postsLimit6`);
        // console.log(res.data);
        setPosts(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getAllPosts();
  }, []);

  return (
    <div>
      <Navbar />
      {/* first sec starts */}
      <section className={homeStyles.bkgImg}>
        <h1>UNLOCK YOUR WARDROBE POTENTIAL</h1>
      </section>
      {/* first sec ends */}
      {/* second sec starts  */}
      <section className={`${homeStyles.mustHave}`}>
        <h1>WARDROBE ESSENTIALS 101</h1>
        <p className={`${homeStyles.poppinsExtraLightItalic} ${homeStyles.p}`}>
          Discover the secret to effortlessly styling your existing clothes and
          banishing frumpy looks for good! Your wardrobe basics are the ultimate
          game-changers - a curated collection of timeless, on-trend essentials
          that will transform your closet into a treasure trove of chic
          possiblities. With these must-have pieces, you'll always have a
          stylish solution at your fingertips, ready to elevate your look from
          bland to grand in an instant say goodbye to fashion fustration and
          hello to a wardrobe that works for you, not against you!.
        </p>
      </section>
      {/* second sec ends  */}
      {/* third sec starts */}
      <section
        className={`${homeStyles.recent} ${appStyles.bgCream} ${appStyles.myBlogDesign}`}
      >
        {/* cards */}
        <div className={`${appStyles.noTextDecoration}`}>
          <div className={`${homeStyles.card}  `}>
            {/* caption for categories */}
            <div className={`${homeStyles.captionHead} ${appStyles.flex}`}>
              <h1 className={` ${appStyles.textBlack} ${appStyles.Algerian} `}>
                Signature outfit
              </h1>
            </div>
            <div className={`${homeStyles.aboutGrid}`}>
              {/* first card */}
              <div className={`${homeStyles.signatureDress}`}>
                <img src="../../public/musthave.PNG" alt="pic" />
              </div>
              <div
                className={`${homeStyles.about} ${homeStyles.aboutFlex} ${homeStyles.fontSize}`}
              >
                <h1 className={`${appStyles.engraversMT}`}>
                  How to Style a Spring Summer New Sports Top | <br />
                  Outfit Ideas For Any Occassion
                </h1>
                <p>
                  Styling a new spring/summer sports top can be both fun and
                  versatile! Here are some outfit ideas for various occasions:
                </p>
                <Link
                  to="#"
                  className={`${homeStyles.viewButton} ${appStyles.engraversMT} ${appStyles.textBlack} ${appStyles.noTextDecoration}`}
                >
                  view the post
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* side bar card */}
        <div>
          <SidebarPost />
        </div>
      </section>
      {/* third sec ends */}

      {/*  fourth sec starts*/}
      <section className={`${homeStyles.padding}`}>
        {/* Recent post card */}
        <div className={`${homeStyles.card}`}>
          <div className={` ${appStyles.flex}`}>
            <div className={`${homeStyles.caption}`}>
              <h1
                className={`${homeStyles.captionHead} ${appStyles.Georgia} ${appStyles.textBlack}`}
              >
                Recent Posts
              </h1>
            </div>

            {/* cat */}
            <div className={`${homeStyles.cat} `}>
              {/* first card */}
              {categories.map((category) => (
                <Link
                  className={`${appStyles.noTextDecoration}`}
                  key={category._id}
                  to={`/category/${category.name}`}
                >
                  <div className={` `}>
                    <p
                      className={` ${appStyles.newAmsterdamRegular} ${homeStyles.color}`}
                    >
                      {category.name}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          <div className={`${homeStyles.postGrid} `}>
            {posts.map((post) => (
              <Link
                className={`${homeStyles.firstCard} ${appStyles.noTextDecoration} `}
                key={post._id}
                to={`/singlePost/${post._id}`}
              >
                <img src={post.image} width="340px" height="400px" alt="pic" />
                <div
                  className={`${homeStyles.cardInfo} ${homeStyles.flexCardInfo}`}
                >
                  <p className={`${appStyles.poppinsExtraLightItalic}`}>
                    {post.category[0]}
                  </p>
                  <p>{new Date(post.createdAt).toLocaleDateString()}</p>
                </div>
                <div
                  className={`${homeStyles.blogText} ${appStyles.robotoBlack} ${appStyles.textBlack}`}
                >
                  {post.title}
                </div>
              </Link>
            ))}
          </div>

          <div className={`${homeStyles.loadDiv}`}>
            <Link
              to="#"
              className={`${homeStyles.load} ${appStyles.noTextDecoration}`}
            >
              LOAD MORE
            </Link>
            <div className={`${homeStyles.loadIcon}`}>
              <i class="fa fa-long-arrow-right" aria-hidden="true"></i>
            </div>
          </div>
        </div>
      </section>
      {/*  fourth sec ends*/}

      {/* fifth section starts */}
      <section className={`${homeStyles.styleDiary} `}>
        <div className={`${homeStyles.Dairies} ${appStyles.Georgia}`}>
          Dairies
        </div>
        <div className={`${homeStyles.daily} ${homeStyles.postGrid2}`}>
          <div className={`${homeStyles.images}`}>
            <img src="../../public/musthave6.PNG" alt="" />
            <p>25/8/2024</p>
          </div>
          <div className={`${homeStyles.images}`}>
            <img src="../../public/musthave7.PNG" alt="" />
            <p>25/8/2024</p>
          </div>
          <div className={`${homeStyles.images}`}>
            <img src="../../public/musthave8.PNG" alt="" />
            <p>25/8/2024</p>
          </div>
          <div className={`${homeStyles.images}`}>
            <img src="../../public/musthave9.PNG" alt="" />
            <p>25/8/2024</p>
          </div>
        </div>
      </section>
      {/* fifth section ends */}

      {/* sixth section starts */}
      <section
        className={`${homeStyles.fashionNews} ${homeStyles.fashionNewsGrid}`}
      >
        <div className={`${homeStyles.firstNews}`}>
          <h1 className={`${appStyles.engraversMT}`}>Fashion News</h1>

          <div className={`${homeStyles.fashionContent}`}>
            <h2>Breaking News: The Latest Trends from Paris Fashion Week</h2>
            <ul>
              <p>
                Paris Fashion Week has just wrapped up, and it’s clear that the
                latest collections are setting the tone for next season’s style.
                Here’s a roundup of the standout trends and must-see moments:
              </p>
              <li>
                <b>Chic Minimalism:</b> Designers like Celine and The Row
                showcased sleek, minimalist silhouettes with a focus on clean
                lines and muted tones. Expect to see a lot of tailored blazers
                and high-waisted trousers making their way into everyday
                wardrobes.
              </li>
              <li>
                <b> Bold Colors:</b> On the other end of the spectrum,
                Balenciaga and Versace brought vibrant hues to the runway. From
                electric blues to fiery reds, bold color blocking is back in a
                big way.
              </li>
              <li>
                <b> Retro Revival:</b> Many designers paid homage to past
                decades, with 70s-inspired flared pants at Chloe and 90s grunge
                elements at Saint Laurent. Vintage vibes are clearly making a
                comeback.
              </li>
            </ul>
          </div>

          <div className={`${homeStyles.fashionContent}`}>
            <h2>Designer Spotlight: Maria Grazia Chiuri</h2>
            <p>
              We caught up with Dior’s Creative Director, Maria Grazia Chiuri,
              to discuss her latest collection. She revealed that the
              inspiration came from her love of modern art and feminist
              literature. Chiuri’s use of intricate embroidery and sculptural
              silhouettes has sparked conversations about the intersection of
              fashion and art.
            </p>
          </div>

          <div className={`${homeStyles.fashionContent}`}>
            <h2>Fashion Forward: Sustainability Takes the Stage</h2>
            <p>
              Sustainability was a major theme this year, with several designers
              emphasizing eco-friendly practices. Stella McCartney introduced a
              new line made entirely from recycled materials, while Gabriela
              Hearst focused on upcycled fabrics. The industry is taking
              significant steps towards greener practices, and it’s exciting to
              see these innovations gaining traction.
            </p>
          </div>

          <div className={`${homeStyles.fashionContent}`}>
            <h2>Upcoming Events to Watch</h2>
            <ul>
              <li>
                <b> London Fashion Week:</b> Next on the calendar is London
                Fashion Week, which kicks off next month. Keep an eye out for
                more trend forecasts and designer showcases.
              </li>
              <li>
                <b> The Met Gala:</b> Mark your calendars for the Met Gala in
                early May. The theme this year promises to be a blend of classic
                glamour and contemporary edge, so expect some truly
                show-stopping looks.
              </li>
            </ul>
          </div>

          <div className={`${homeStyles.fashionContent}`}>
            <h2>What’s Your Take?</h2>
            <p>
              We’d love to hear from you! Which trend are you most excited about
              from Paris Fashion Week? Do you think bold colors or minimalist
              chic will dominate the fashion scene? Share your thoughts in the
              comments below!
            </p>
          </div>
        </div>
        <div className={`${homeStyles.secNews}`}></div>
      </section>
      {/* sixth section ends */}
      <Footer />
    </div>
  );
};

export default Home;
