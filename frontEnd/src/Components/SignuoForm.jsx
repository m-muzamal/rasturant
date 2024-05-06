import axios from "axios";
import React, { useState } from "react";
import { FaEnvelope, FaEye, FaEyeSlash } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const LoginForm = ({ handleClick, handleClick1 }) => {
  const navigate = useNavigate();
  const [err, setErr] = useState("");
  const [visible, setVisible] = useState(true);
  const [input, setInput] = useState({
    name: "",
    email: "",
    password: "",
    confPassword: "",
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
    if (input.password === input.confPassword) {
      (async () => {
        try {
          await axios.post("http://localhost:3001/api/v1/users/register", {
            name: input.name,
            email: input.email,
            password: input.password,
          });
          alert("User registered successfully!");
          handleClick();
          handleClick1();
        } catch (error) {
          console.error(error);
          error && displayErr("Somthing went wrong!");
        }
      })();
    } else {
      displayErr("Password is not matched!");
    }
  };

  const displayErr = (msg) => {
    setErr(msg);
    setTimeout(() => {
      setErr("");
    }, 2000);
  };

  const handleSignin = () => {
    handleClick();
    handleClick1();
  };

  return (
    <section className="loginSection">
      <div className="loginForm-content">
        <div className="cancel" onClick={() => handleClick()}>
          <IoClose />
        </div>
        <h1 className="loginForm-title">Sign up</h1>
        <form className="loginForm" onSubmit={handleSubmit}>
          {err && <p className="errmsg">{err}</p>}
          <div className="inputBox">
            <span className="fas fa-envelope">
              <FaEnvelope />
            </span>
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={input.name}
              onChange={handleChange}
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
          <div className="inputBox">
            <span className="fas fa-eye" onClick={() => setVisible(!visible)}>
              {visible ? <FaEye /> : <FaEyeSlash />}
            </span>
            <input
              type={visible ? "password" : "text"}
              name="confPassword"
              placeholder="Confirm Password"
              value={input.confPassword}
              onChange={handleChange}
              required
            />
          </div>
          <button className="btn" type="submit">
            Register
          </button>
          <p className="small">Already have an account?</p>
          <Link className="sign-up" onClick={handleSignin}>
            Sign in
          </Link>
        </form>
      </div>
    </section>
  );
};

export default LoginForm;
