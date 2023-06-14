import React from "react";
import Banner from "../Banner/Banner";
import Products from "../Products/Products";
import Contact from "../Contact/Contact";
import Services from "../Services/Services";
import Hero from "../Hero/Hero";

const Home = () => {
  return (
    <div>
      <Banner />
      {/* <Outlet /> */}
      <Hero />
      <Services />
      <Contact />
      <Products />
    </div>
  );
};

export default Home;
