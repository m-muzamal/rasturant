import React, { useEffect, useState } from "react";
import { FaTimes } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart } from "../Redux/resturantSlice/resturantSlice";
import { loadStripe } from "@stripe/stripe-js";
import { useNavigate } from "react-router-dom";
import Spinner from "./Spinner";
import Address from "./Address";

const CartBox = ({ value }) => {
  const [visible, setVisible] = useState(false);
  const [checked, setChecked] = useState(false);
  const [loading, setLoading] = useState(false);
  const user = JSON.parse(sessionStorage.getItem("user")) || [];
  const navigate = useNavigate();
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

  const handelVisible = () => {
    setVisible(!visible);
  };

  const handleCheckout = async (plan) => {
    if (checked) {
      console.log("Cash on delivery");
      handelVisible();
    } else {
      if (user) {
        const stripe = await loadStripe(
          "pk_test_51PBRzCRp2oHR08OdLaGSRxkveyGPjY6orWl3cnCeUJGTUTMGPzwJyoGFAmxx4DaTxTRVdLQZbtteUveaKxBNdU4i00tiO1JVvJ"
        );
        const body = {
          product: plan,
        };

        const headers = {
          "Content-Type": "application/json",
        };
        setLoading(true);
        const res = await fetch(
          "http://localhost:3001/api/v1/products/checkout",
          {
            method: "POST",
            headers: headers,
            body: JSON.stringify(body),
          }
        );
        const session = await res.json();
        // console.log("Resoponse: ", session);
        const result = await stripe.redirectToCheckout({
          sessionId: session.id,
        });
        setLoading(false);
        // console.error(result);
        if (result) {
          console.error(result);
          alert("Something went wrong.");
        }
      } else {
        alert("You have to login first.");
        navigate("/");
      }
    }
  };

  return (
    <>
      {visible && <Address handleClick={handelVisible} />}
      <div className={`cart-items-container ${value && "active"}`}>
        {cartItem.length > 0 ? (
          <>
            {cartItem?.map((item, index) => (
              <div className="cart-item" key={index * Math.random()}>
                <span
                  className="fas fa-times"
                  onClick={() => handleClick(item)}
                >
                  <FaTimes />
                </span>
                <img src={item.image} alt="" />
                <div className="content">
                  <h3>{item.name}</h3>
                  <div className="price">${item.newPrice}/-</div>
                </div>
              </div>
            ))}
            <div className="total">
              <p>Rs: {total}/- </p>
            </div>
            <div className="checkmark">
              <input
                type="checkbox"
                name="delivery"
                id="delivery"
                checked={checked}
                onChange={(e) => setChecked(!checked)}
              />
              <label htmlFor="delivery">Cash on delivery</label>
            </div>
            <a
              className="btn"
              onClick={() => handleCheckout("price_1PGFwJRp2oHR08OdZwJ7cZCD")}
            >
              checkout now
              {loading && <Spinner />}
            </a>
          </>
        ) : (
          <h1 className="empty">No items</h1>
        )}
      </div>
    </>
  );
};

export default CartBox;
