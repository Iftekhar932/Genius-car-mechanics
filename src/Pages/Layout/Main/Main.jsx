import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "../../Shared/Footer/Footer";
import Header from "../../Shared/Header/Header";
import Hero from "../../Hero/Hero";
import Services from "../../Services/Services";
import Contact from "../../Contact/Contact";
import Products from "../../Products/Products";

const Main = () => {
  return (
    <div>
      <Header />
      <Outlet />
      <Hero />
      <Services />
      <Contact />
      <Products />
      <Footer />
    </div>
  );
};

export default Main;
