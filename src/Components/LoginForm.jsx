import React, { useState } from "react";
import { FaEnvelope, FaEye, FaEyeSlash } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const LoginForm = ({ handleClick }) => {
  const navigate = useNavigate();
  const [err, setErr] = useState("");
  const [visible, setVisible] = useState(true);
  const [input, setInput] = useState({
    email: "",
    password: "",
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
    if (input.email === "admin@gmail.com" && input.password === "admin123") {
      handleClick();
      navigate("/dashboard");
    } else {
      displayErr("Invalid email or password!");
    }
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
        <h1 className="loginForm-title">Login</h1>
        <form className="loginForm" onSubmit={handleSubmit}>
          {err && <p className="errmsg">{err}</p>}
          <div className="inputBox">
            <span className="fas fa-envelope">
              <FaEnvelope />
            </span>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={input.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="inputBox">
            <span className="fas fa-eye" onClick={() => setVisible(!visible)}>
              {visible ? <FaEye /> : <FaEyeSlash />}
            </span>
            <input
              type={visible ? "password" : "text"}
              name="password"
              placeholder="Password"
              value={input.password}
              onChange={handleChange}
              required
            />
          </div>
          <button className="btn" type="submit">
            Login
          </button>
          <p className="small">Only for the authorized person.</p>
        </form>
      </div>
    </section>
  );
};

export default LoginForm;
