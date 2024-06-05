import React, { useEffect } from "react";
import HeaderImg from "../components/HeaderImg";

const About = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="about">
      <HeaderImg title="About Us" />

      <div className="about__main">
        <p>
          Dealsmarineparts.com is a US based company. That specializes in high
          quality new aftermarket products, remanufactured, and used inboard
          outboard parts, and general marine products.
        </p>
      </div>
    </div>
  );
};

export default About;
