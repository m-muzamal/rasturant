import React from "react";
import { FaFacebook, FaInstagram, FaWhatsapp, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <>
      <section className="footer">
        <div className="share">
          <a href="#" className="fab fa-facebook-f">
            <FaFacebook />
          </a>
          <a href="#" className="fab fa-twitter">
            <FaInstagram />
          </a>
          <a href="#" className="fab fa-instagram">
            <FaTwitter />
          </a>
          <a href="#" className="fab fa-linkedin">
            <FaWhatsapp />
          </a>
        </div>
        <div className="links">
          <a href="#">home</a>
          <a href="#">about</a>
          <a href="#">menu</a>
          <a href="#">products</a>
          <a href="#">review</a>
          <a href="#">contact</a>
          <a href="#">blogs</a>
        </div>
        <div className="credit">
          created by <span>Sufyan Khalid</span> | all rights reserved
        </div>
      </section>
    </>
  );
};

export default Footer;
