import React from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../Redux/resturantSlice/resturantSlice";

const Menu = ({ items }) => {
  const dispatch = useDispatch();

  const handleClick = (item) => {
    dispatch(addToCart(item));
  };

  return (
    <>
      <section className="menu" id="menu">
        <h1 className="heading">
          our <span>menu</span>
        </h1>

        <div className="box-container">
          {items?.map((item, index) => (
            <div className="box" key={index * Math.random()}>
              <img src={item.image} alt="" />
              <h3>{item.name}</h3>
              <div className="price">
                ${item.newPrice} <span>{item.oldPrice}</span>
              </div>
              <button className="btn" onClick={() => handleClick(item)}>
                add to cart
              </button>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default Menu;
