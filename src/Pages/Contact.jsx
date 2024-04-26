import React, { useRef, useState } from "react";
import { FaEnvelope, FaUser } from "react-icons/fa";
import { FaMessage } from "react-icons/fa6";
import emailjs from "emailjs-com";

const Contact = () => {
  const form = useRef();
  const [input, setInput] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setInput((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendEmail();
    // console.log(input);
    form.current.name.value = "";
    form.current.email.value = "";
    form.current.message.value = "";
  };

  const sendEmail = () => {
    emailjs
      .sendForm(
        "service_cujqwnl",
        "template_4y5la1g",
        form.current,
        "P7eL5VYm6Dr8RZvHD"
      )
      .then(
        () => {
          // console.log("SUCCESS!");
        },
        (error) => {
          console.error("FAILED...", error.text);
        }
      );
  };

  return (
    <>
      <section className="contact" id="contact">
        <h1 className="heading">
          <span>contact</span> us
        </h1>
        <div className="row">
          <iframe
            className="map"
            src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d11993.267641772954!2d-72.8480109!3d41.2802068!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x36c6fa619c4f5603!2sMcDonald&#39;s!5e0!3m2!1sen!2s!4v1633364807635!5m2!1sen!2s"
            allowFullScreen=""
            loading="lazy"
          ></iframe>

          <form ref={form} onSubmit={handleSubmit}>
            <h3>get in touch</h3>
            <div className="inputBox">
              <span className="fas fa-user">
                <FaUser />
              </span>
              <input
                type="text"
                name="name"
                value={input.name}
                onChange={handleChange}
                placeholder="name"
                required
              />
            </div>
            <div className="inputBox">
              <span className="fas fa-envelope">
                <FaEnvelope />
              </span>
              <input
                type="email"
                name="email"
                value={input.email}
                onChange={handleChange}
                placeholder="email"
                required
              />
            </div>
            <div className="inputBox">
              <span className="fas fa-message">
                <FaMessage />
              </span>
              <input
                type="text"
                name="message"
                value={input.message}
                onChange={handleChange}
                placeholder="your message..."
                required
              />
            </div>
            <input type="submit" className="btn" />
          </form>
        </div>
      </section>
    </>
  );
};

export default Contact;
