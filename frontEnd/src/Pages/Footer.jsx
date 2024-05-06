import React from "react";
import { FaFacebook, FaInstagram, FaWhatsapp, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <>
      <section className="footer">
        <div className="share">
          <a
            href="https://www.facebook.com/sufyan.khalid.54966"
            target="_blank"
            className="fab fa-facebook-f"
          >
            <FaFacebook />
          </a>
          <a
            href="https://www.instagram.com/sufi_0061?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
            target="_blank"
            className="fab fa-instagram"
          >
            <FaInstagram />
          </a>
          <a
            href="https://twitter.com/"
            target="_blank"
            className="fab fa-twitter"
          >
            <FaTwitter />
          </a>
          <a
            href="https://api.whatsapp.com/send?phone=923107493529"
            target="_blank"
            className="fab fa-whatsapp"
          >
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
