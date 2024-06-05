import React from "react";
import hero1 from "../assets/images/hero1.jpeg";
import accessoryBg from "../assets/images/accessoryBg.jpeg";
import { Link } from "react-router-dom";

const Range = () => {
  return (
    <section className="range">
      <Link to="/products/marine-electronics">
        <div className="range__item">
          <div className="range__item__imgCon">
            <img src={hero1} alt="" />
          </div>
          <div className="range__item__disc">
            <p>View our range of</p>
            <h5>Marine Electronics</h5>
          </div>
        </div>
      </Link>
      <Link to="/products/accessories">
        <div className="range__item">
          <div className="range__item__imgCon">
            <img src={accessoryBg} alt="" />
          </div>
          <div className="range__item__disc">
            <p>View our range of</p>
            <h5>Accessories</h5>
          </div>
        </div>
      </Link>
    </section>
  );
};

export default Range;
