import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import HowStyles from "./howToStyle.module.css";

const HowToStyle = () => {
  return (
    <div>
      <Navbar />
      <div>
        <section className={`${HowStyles.howToStyleSec}`}>
          <div className={`${HowStyles.howToStyle}`}>
            <h1>
              How to Style a Spring Summer New Sports Top | Outfit Ideas For Any
              Occassion
            </h1>
            <div className={`${HowStyles.image}`}>
              <img src="../../public/Capture-COLLAGE1.jpg" alt="" />
              <img src="../../public/musthave.PNG" alt="" />
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
};

export default HowToStyle;
