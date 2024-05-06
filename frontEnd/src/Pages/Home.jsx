import React, { useEffect, useState } from "react";
import About from "./About";
import Menu from "./Menu";
import Products from "./Products";
import Review from "./Review";
import Contact from "./Contact";
import Blog from "./Blog";
import { useFetch } from "../utils/useFetch";

const Home = () => {
  const [menu, setMenu] = useState();
  const [prod, setProd] = useState();
  const fetch = useFetch("http://localhost:3001/api/v1/products/all-products");

  useEffect(() => {
    if (fetch) {
      setMenu(fetch?.data?.products.filter((item) => item.category === "menu"));
      setProd(fetch?.data?.products.filter((item) => item.category === "prod"));
    }
  }, [fetch]);

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
      <Menu items={menu} />
      <Products items={prod} />
      <Review />
      <Contact />
      <Blog />
    </>
  );
};

export default Home;
