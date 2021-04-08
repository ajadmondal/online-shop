import React, {useState} from 'react';
import './App.css';
import Home from "./componenst/Home";
import Navbar from './componenst/Navbar';
import Footer from "./componenst/Footer";
import Categories from './componenst/Categories';
function App() {
  const [cart, setCart] = useState([]);
  const addToCart = (e) => {
    const newcart = [...cart, e];
    setCart(newcart);
    console.log(newcart);
  }
  return (
    <div className="App">
      <div className="Navbar">
      <Navbar
        cart = {cart}
      />
      </div>
      <div className="Categories"><Categories/></div>
      
      <div className="banner">
        <img src="https://www.webpaceindia.com/images/ecommerce-banner.png" alt=""/>
      </div>
      <Home
        handleCart = {addToCart}
      />
      <Footer/>
    </div>
  );
}

export default App;
