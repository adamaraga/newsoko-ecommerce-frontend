import { Link } from "react-router-dom";
import hero1 from "../assets/images/hero1.jpeg";
import hero2 from "../assets/images/hero2.jpeg";
import hero3 from "../assets/images/hero3.jpeg";
import { Fade } from "react-slideshow-image";

const Hero = () => {
  const fadeImages = [hero1, hero2, hero3];

  return (
    <section className="hero">
      <Fade
        autoplay={true}
        infinite={true}
        pauseOnHover={false}
        duration={5000}
        arrows={false}
      >
        <div className="hero__eachFade">
          <img src={fadeImages[0]} alt="Hero 1" />
        </div>
        <div className="hero__eachFade">
          <img src={fadeImages[1]} alt="Hero 2" />
        </div>
        <div className="hero__eachFade">
          <img src={fadeImages[2]} alt="Hero 3" />
        </div>
      </Fade>

      <div className="hero__main">
        <h2>New, used & remanufactured parts</h2>
        <h1>Outboard engines, parts & accessories</h1>
        <div className="hero__main__buttons">
          <Link to="/shop">
            <button className="btnAlt">Shop Now</button>
          </Link>
          <Link to="/contact-us">
            <button className="btn">Contact Us</button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;
