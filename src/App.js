import React, {useState} from 'react';
import './App.css';
import Body from "./componenst/Body";
import Navbar from './componenst/Navbar';
import Footer from "./componenst/Footer";
import Categories from './componenst/Categories';
import Cart from './componenst/Cart';
import {BrowserRouter as Router, Route, Switch} from  'react-router-dom';
function App() {
  const [cart, setCart] = useState([]);
  const addToCart = (e) => {
    const newcart = [...cart, e];
    setCart(newcart);
    console.log(newcart);
  }
  return (
    <Router>
      <div className="App">
        <div className="Navbar">
          <Navbar cart={cart} />
        </div>
        <div className="Categories">
          <Categories />
        </div>

        <div className="banner">
          <img
            src="https://www.webpaceindia.com/images/ecommerce-banner.png"
            alt=""
          />
        </div>
        <Switch>
          <Router path="/" exact>
            <Body path="" handleCart={addToCart} />
          </Router>
          <Router path="/electronics">
            <Body path="/category/electronics" handleCart={addToCart} />
          </Router>
          <Router path="/jewelery">
            <Body path="/category/jewelery" handleCart={addToCart} />
          </Router>
          <Router path="/men-clothing">
            <Body path="/category/men clothing" handleCart={addToCart} />
          </Router>
          <Router path="/women-clothing">
            <Body path="/category/women clothing" handleCart={addToCart} />
          </Router>
          <Router path="/cart">
            <Cart
              items={cart} />
          </Router>
        </Switch>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
