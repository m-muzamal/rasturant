import React, { useEffect, useState } from "react";
import { FaTimes } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart } from "../Redux/resturantSlice/resturantSlice";

const CartBox = ({ value }) => {
  const dispatch = useDispatch();
  const [total, setTotal] = useState(0);
  const cartItem = useSelector((state) => state.resturant.cart);

  useEffect(() => {
    let totalPrice = 0;
    for (let i in cartItem) {
      totalPrice += Number(cartItem[i].newPrice);
      setTotal(totalPrice);
    }
  }, [cartItem]);

  const handleClick = (item) => {
    dispatch(removeFromCart(item));
  };

  return (
    <div className={`cart-items-container ${value && "active"}`}>
      {cartItem.length > 0 ? (
        <>
          {cartItem?.map((item, index) => (
            <div className="cart-item" key={index * Math.random()}>
              <span className="fas fa-times" onClick={() => handleClick(item)}>
                <FaTimes />
              </span>
              <img src={item.img} alt="" />
              <div className="content">
                <h3>{item.name}</h3>
                <div className="price">${item.newPrice}/-</div>
              </div>
            </div>
          ))}
          <div className="total">
            <p>Total: </p>
            <p>Rs: {total}/- </p>
          </div>
          <a href="#" className="btn">
            checkout now
          </a>
        </>
      ) : (
        <h1 className="empty">No items</h1>
      )}
    </div>
  );
};

export default CartBox;
