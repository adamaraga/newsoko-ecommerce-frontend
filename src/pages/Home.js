import React, { useEffect } from "react";
import Hero from "../components/Hero";
import Featured from "../components/Featured";
import Brands from "../components/Brands";
import Range from "../components/Range";
import WholeSale from "../components/WholeSale";

const Home = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="home">
      <Hero />
      <Featured />
      <Brands />
      <Range />
      <WholeSale />
    </div>
  );
};

export default Home;
