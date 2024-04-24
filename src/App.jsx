import "./App.css";
import About from "./Components/About.jsx";
import Blog from "./Components/Blog.jsx";
import Contact from "./Components/Contact.jsx";
import Footer from "./Components/Footer.jsx";
import Home from "./Components/Home";
import Menu from "./Components/Menu.jsx";
import Navbar from "./Components/Navbar";
import Products from "./Components/Products.jsx";
import Review from "./Components/Review.jsx";

function App() {
  return (
    <>
      <Navbar />
      <Home />
      <About />
      <Menu />
      <Products />
      <Review />
      <Contact />
      <Blog />
      <Footer />
    </>
  );
}

export default App;
