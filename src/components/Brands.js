import React from "react";
import anchorIcon from "../assets/images/svg/anchor2.svg";
import brand1Icon from "../assets/images/svg/brand1.svg";
import brand2Icon from "../assets/images/svg/brand2.svg";
import brand3Icon from "../assets/images/svg/brand3.svg";
import brand4Icon from "../assets/images/svg/brand4.svg";
import brand5Icon from "../assets/images/svg/brand5.svg";
import brand6Icon from "../assets/images/svg/brand6.svg";

const Brands = () => {
  const brands = [
    brand1Icon,
    brand2Icon,
    brand3Icon,
    brand4Icon,
    brand5Icon,
    brand6Icon,
  ];
  return (
    <section className="brands">
      <div className="brands__header">
        <h3>Wide range of brands in stock</h3>
        <h4>Featured Brands</h4>
        <img src={anchorIcon} alt="" className="brands__header__anchor" />
      </div>

      <div className="brands__main">
        {brands.map((brand, i) => {
          return (
            <img key={i} className="brands__main__item" src={brand} alt="" />
          );
        })}
      </div>
    </section>
  );
};

export default Brands;
