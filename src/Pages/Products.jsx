import React from "react";
import { product } from "../Data";
import { FaStar } from "react-icons/fa6";
import { FaStarHalfAlt, FaShoppingCart, FaHeart, FaEye } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { setResturant } from "../Redux/resturantSlice/resturantSlice";

const Products = () => {
  const dispatch = useDispatch();

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
                <a
                  className="fas fa-shopping-cart"
                  onClick={() => dispatch(setResturant(item))}
                >
                  <FaShoppingCart />
                </a>
                <a className="fas fa-heart">
                  <FaHeart />
                </a>
                <a className="fas fa-eye">
                  <FaEye />
                </a>
              </div>
              <div className="image">
                <img src={item.img} alt="" />
              </div>
              <div className="content">
                <h3>{item.name}</h3>
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
                  ${item.newPrice} <span>${item.oldPrice}</span>
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
