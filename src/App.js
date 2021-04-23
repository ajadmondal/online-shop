import React, {useState, useEffect} from 'react';
import './App.css';
import Body from "./componenst/Body";
import Navbar from './componenst/Navbar';
import Footer from "./componenst/Footer";
import Categories from './componenst/Categories';
import Cart from './componenst/Cart';
// import SignIn from "./componenst/SignIn";
import { auth } from "./firebase";
import {BrowserRouter as Router, Route, Switch} from  'react-router-dom';
function App() {
  const [cart, setCart] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [user, setUser] = useState();
  const handleRemove = (title) => {
    let i = 0;
    for (; i < cart.length; i++){
      if (cart[i].title === title)
        break;
    }
    if (i > -1) {
      const price = Number(Number(totalPrice) - Number(cart[i].price)).toFixed(2);
      setTotalPrice(price);
      cart.splice(i, 1);
      setCart(cart);
  }
  }
  const addToCart = (e) => {
    const newcart = [...cart, e];
    setCart(newcart);
    const price = Number(Number(totalPrice) + Number(e.price)).toFixed(2);
    setTotalPrice(price);
  }
  useEffect(() => {
    auth.onAuthStateChanged(authUser => {
      if (authUser) {
        setUser(authUser);
      }
      else {
        setUser(null);
      }
    })
  }, [user]);
  return (
    <Router>
      <div className="App">
        <Switch>
          {/* <Route path="/signin">
            <SignIn />
          </Route> */}
          <Route path="/" exact>
            <div className="Navbar">
              <Navbar cart={cart} user={user} />
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
            <Body path="" handleCart={addToCart} />
          </Route>
          <Route path="/electronics">
            <div className="Navbar">
              <Navbar cart={cart} user={user} />
            </div>
            <div className="Categories">
              <Categories />
            </div>
            <div className="banner">
              <img
                src="https://demoopc.aeipix.com/AX01/shopnia17/demo2/image/cache/catalog/Main-Banner-2-1903x780.jpg"
                alt=""
              />
            </div>
            <Body path="/category/electronics" handleCart={addToCart} />
          </Route>
          <Route path="/jewelery">
            <div className="Navbar">
              <Navbar cart={cart} user={user} />
            </div>
            <div className="Categories">
              <Categories />
            </div>
            <div className="banner">
              <img
                src="https://mir-s3-cdn-cf.behance.net/project_modules/fs/15b5a866565959.5b1a0b70ac010.jpg"
                alt=""
              />
            </div>
            <Body path="/category/jewelery" handleCart={addToCart} />
          </Route>
          <Route path="/men-clothing">
            <div className="Navbar">
              <Navbar cart={cart} user={user} />
            </div>
            <div className="Categories">
              <Categories />
            </div>
            <div className="banner">
              <img
                src="https://www.muscatgrandmall.com/media/2437/men-fashion.jpg?anchor=center&mode=crop&width=1600&height=600&rnd=132032467470000000"
                alt=""
              />
            </div>
            <Body path="/category/men clothing" handleCart={addToCart} />
          </Route>
          <Route path="/women-clothing">
            <div className="Navbar">
              <Navbar cart={cart} user={user} />
            </div>
            <div className="Categories">
              <Categories />
            </div>
            <div className="banner">
              <img
                src="https://www.masonkart.com/pub/media/catalog/category/BB-Hm-Pg-Hero-Banner-NOV19-1800x693.jpg"
                alt=""
              />
            </div>
            <Body path="/category/women clothing" handleCart={addToCart} />
          </Route>
          <Route path="/cart">
            <div className="Navbar">
              <Navbar cart={cart} user={user} />
            </div>
            <div className="Categories">
              <Categories />
            </div>
            <Cart
              items={cart}
              handleRemove={handleRemove}
              totalPrice={totalPrice}
            />
          </Route>
        </Switch>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
