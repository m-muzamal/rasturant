import React from "react";
import About from "./About";
import Menu from "./Menu";
import Products from "./Products";
import Review from "./Review";
import Contact from "./Contact";
import Blog from "./Blog";

const Home = () => {
  return (
    <>
      <section className="home" id="home">
        <div className="content">
          <h3>
            fresh <span>food in the </span>morning
          </h3>
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Placeat
            labore, sint cupiditate distinctio tempora reiciendis.
          </p>
          <a href="#menu" className="btn">
            get yours now
          </a>
        </div>
      </section>
      <About />
      <Menu />
      <Products />
      <Review />
      <Contact />
      <Blog />
    </>
  );
};

export default Home;
