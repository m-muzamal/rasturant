import React from "react";
import { blog } from "../Data";

const Blog = () => {
  return (
    <>
      <section className="blogs" id="blogs">
        <h1 className="heading">
          our <span>blogs</span>
        </h1>

        <div className="box-container">
          {blog.map((item, index) => (
            <div className="box" key={index * Math.random()}>
              <div className="image">
                <img src={item.img} alt="" />
              </div>
              <div className="content">
                <a href="#" className="title">
                  {item.title}
                </a>
                <span>
                  by {item.admin} / {item.date}
                </span>
                <p>
                  {item.about.length > 80
                    ? `${item.about.slice(0, 80)}...`
                    : item.about}
                </p>
                <a href="#" className="btn">
                  read more
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default Blog;
