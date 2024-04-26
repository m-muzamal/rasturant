import "./App.css";
import About from "./Pages/About.jsx";
import Blog from "./Pages/Blog.jsx";
import Contact from "./Pages/Contact.jsx";
import Footer from "./Pages/Footer.jsx";
import Home from "./Pages/Home";
import Menu from "./Pages/Menu.jsx";
import Navbar from "./Pages/Navbar";
import Products from "./Pages/Products.jsx";
import Review from "./Pages/Review.jsx";

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
