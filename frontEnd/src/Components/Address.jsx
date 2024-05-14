import React, { useState } from "react";
import { FaEye, FaEyeSlash, FaPhone } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const LoginForm = ({ handleClick }) => {
  const navigate = useNavigate();
  const [err, setErr] = useState("");
  const [input, setInput] = useState({
    address: "",
    phone: "",
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
    if ([input.address, input.phone].some((item) => item === "")) {
      displayErr("Please fill all the fields");
    }
    alert("Your order is deliverd in 30 mins!");
    navigate("/");
    handleClick();
    window.location.reload(true);
  };

  const displayErr = (msg) => {
    setErr(msg);
    setTimeout(() => {
      setErr("");
    }, 2000);
  };

  return (
    <section className="loginSection">
      <div className="loginForm-content">
        <div className="cancel" onClick={() => handleClick()}>
          <IoClose />
        </div>
        <h1 className="loginForm-title">Give the detail</h1>
        <form className="loginForm" onSubmit={handleSubmit}>
          {err && <p className="errmsg">{err}</p>}
          <div className="inputBox">
            <span className="fas fa-envelope">
              <FaLocationDot />
            </span>
            <input
              type="address"
              name="address"
              placeholder="Address"
              value={input.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="inputBox">
            <span className="fas fa-eye">
              <FaPhone />
            </span>
            <input type="phone" name="phone" placeholder="Phone" required />
          </div>
          <button className="btn" type="submit">
            Confirm
          </button>
        </form>
      </div>
    </section>
  );
};

export default LoginForm;
