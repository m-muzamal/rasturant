import React from "react";
import { review } from "../Data";
import qouteImg from "../assets/quote-img.png";
import { FaStar, FaStarHalfAlt } from "react-icons/fa";

const Review = () => {
  return (
    <>
      <section className="review" id="review">
        <h1 className="heading">
          customer's <span>review</span>
        </h1>

        <div className="box-container">
          {review.map((item, index) => (
            <div className="box" key={index * Math.random()}>
              <img src={qouteImg} alt="image-is-missing" className="quote" />
              <p>{item.msg}</p>
              <img src={item.img} className="user" alt="" />
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
                  <FaStarHalfAlt />
                </i>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default Review;
