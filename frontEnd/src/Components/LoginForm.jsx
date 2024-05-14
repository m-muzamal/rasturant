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
      (async () => {
        try {
          const res = await axios.post(
            "http://localhost:3001/api/v1/users/login",
            {
              email: input.email,
              password: input.password,
            }
          );
          // console.log(res);
          sessionStorage.setItem("user", JSON.stringify(res.data?.data?.user));
          alert("You are logged in successfully!");
          handleClick();
        } catch (error) {
          console.error(error);
          error && displayErr("Invalid email or password!");
          sessionStorage.clear();
        }
      })();
    }
  };

  const displayErr = (msg) => {
    setErr(msg);
    setTimeout(() => {
      setErr("");
    }, 2000);
  };

  const handleSignup = () => {
    handleClick();
    handleClick1();
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
          <p className="small">Dashboard is only for the authorized person.</p>
          <p className="small">Don't have account?</p>
          <Link className="sign-up" onClick={handleSignup}>
            Sign up
          </Link>
        </form>
      </div>
    </section>
  );
};

export default LoginForm;
