import React from "react";
import { product } from "../Data";
import { FaStar } from "react-icons/fa6";
import { FaStarHalfAlt, FaShoppingCart, FaHeart, FaEye } from "react-icons/fa";

const Products = () => {
  return (
    <>
      <section className="products" id="products">
        <h1 className="heading">
          our <span>products</span>
        </h1>

        <div className="box-container">
          {product.map((item, index) => (
            <div className="box" key={index * Math.random()}>
              <div className="icons">
                <a href="#" className="fas fa-shopping-cart">
                  <FaShoppingCart />
                </a>
                <a href="#" className="fas fa-heart">
                  <FaHeart />
                </a>
                <a href="#" className="fas fa-eye">
                  <FaEye />
                </a>
              </div>
              <div className="image">
                <img src={item.img} alt="" />
              </div>
              <div className="content">
                <h3>fresh coffee</h3>
                <div className="stars">
                  <i className="fas fa-star">
                    <FaStar />
                  </i>
                  <i className="fas fa-star">
                    <FaStar />
                  </i>
                  <i className="fas fa-star">
                    <FaStar />
                  </i>
                  <i className="fas fa-star">
                    <FaStar />
                  </i>
                  <i className="fas fa-star-half-alt">
                    {" "}
                    <FaStarHalfAlt />
                  </i>
                </div>
                <div className="price">
                  $15.99 <span>$20.99</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default Products;
