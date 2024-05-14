import { useState } from "react";
import Logo from "../assets/logo.png";
import { FaCartPlus, FaSearch } from "react-icons/fa";
import { IoMdMenu } from "react-icons/io";
import CartBox from "../Components/CartBox";
import { useSelector } from "react-redux";
import LoginForm from "../Components/LoginForm";
import SignuoForm from "../Components/SignuoForm";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const user = JSON.parse(sessionStorage.getItem("user"));
  const cartItems = useSelector((state) => state.resturant.cart);
  const [signup, setSignup] = useState(false);
  const [cartBox, setCartBox] = useState(false);
  const [popup, setPopup] = useState(false);
  const navigate = useNavigate();

  const handleClick = () => {
    window.scrollTo(0, 0);
    setPopup(!popup);
  };

  const handleSignup = () => {
    window.scrollTo(0, 0);
    setSignup(!signup);
  };

  const handleLogout = () => {
    if (confirm("Are you sure you want to logout?")) {
      sessionStorage.clear();
      navigate("/");
    }
  };

  return (
    <>
      {popup && (
        <LoginForm handleClick={handleClick} handleClick1={handleSignup} />
      )}
      {signup && (
        <SignuoForm handleClick={handleSignup} handleClick1={handleClick} />
      )}
      <header className="header">
        <a href="#" className="logo">
          <img src={Logo} alt="" />
        </a>
        <nav className="navbar">
          <Link to="/">Home</Link>
          <a href="#about">About</a>
          <a href="#menu">Menu</a>
          <a href="#products">Products</a>
          <a href="#review">Review</a>
          <a href="#contact">Contact</a>
          <a onClick={() => setPopup(handleClick)}>Dashboard</a>
        </nav>
        <div className="icons">
          <div className="fas fa-search" id="search-btn">
            {!user ? (
              <a className="login-btn" onClick={handleClick}>
                Login
              </a>
            ) : (
              <a className="login-btn" onClick={handleLogout}>
                {user.name}
              </a>
            )}
          </div>
          <div
            className="fas fa-shopping-cart"
            id="cart-btn"
            onClick={() => setCartBox(!cartBox)}
          >
            <FaCartPlus />
            {cartItems.length > 0 && (
              <p className="notification">{cartItems?.length}</p>
            )}
          </div>
          <div className="fas fa-bars" id="menu-btn">
            <IoMdMenu />
          </div>
        </div>
        {/* <div className={`search-form ${search && "active"}`}>
          <input type="search" id="search-box" placeholder="search here..." />
          <label htmlFor="search-box" className="fas fa-search"></label>
        </div> */}
        <CartBox value={cartBox} />
      </header>
    </>
  );
};

export default Navbar;
