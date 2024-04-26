import { useState } from "react";
import Logo from "../assets/logo.png";
import { FaCartPlus, FaSearch } from "react-icons/fa";
import { IoMdMenu } from "react-icons/io";
import CartBox from "../Components/CartBox";

const Navbar = () => {
  const [search, setSearch] = useState(false);
  const [cartBox, setCartBox] = useState(false);

  return (
    <>
      <header className="header">
        <a href="#" className="logo">
          <img src={Logo} alt="" />
        </a>
        <nav className="navbar">
          <a href="#home">Home</a>
          <a href="#about">About</a>
          <a href="#menu">Menu</a>
          <a href="#products">Products</a>
          <a href="#review">Review</a>
          <a href="#contact">Contact</a>
        </nav>
        <div className="icons">
          <div
            className="fas fa-search"
            id="search-btn"
            onClick={() => setSearch(!search)}
          >
            <FaSearch />
          </div>
          <div
            className="fas fa-shopping-cart"
            id="cart-btn"
            onClick={() => setCartBox(!cartBox)}
          >
            <FaCartPlus />
          </div>
          <div className="fas fa-bars" id="menu-btn">
            <IoMdMenu />
          </div>
        </div>
        <div className={`search-form ${search && "active"}`}>
          <input type="search" id="search-box" placeholder="search here..." />
          <label htmlFor="search-box" className="fas fa-search"></label>
        </div>
        <CartBox value={cartBox} />
      </header>
    </>
  );
};

export default Navbar;
