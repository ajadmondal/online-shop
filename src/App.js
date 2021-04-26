import React, {useState, useEffect} from 'react';
import './App.css';
import Body from "./componenst/Body";
import Navbar from './componenst/Navbar';
import Footer from "./componenst/Footer";
import Categories from './componenst/Categories';
import Cart from './componenst/Cart';
import Orders from "./componenst/Orders";

import { auth, db } from "./firebase";
import {BrowserRouter as Router, Route, Switch} from  'react-router-dom';
function App() {
  const [cart, setCart] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [user, setUser] = useState();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
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
      if(user) updateToDB(cart, price);
  }
  }
  const addToCart = (e) => {
    const newcart = [...cart, e];
    setCart(newcart);
    const price = Number(Number(totalPrice) + Number(e.price)).toFixed(2);
    setTotalPrice(price);
    if(user) updateToDB(newcart, price);
  }
  const updateToDB = (newcart, price) => {
    db.collection("users")
      .doc(user?.uid)
      .collection("cart")
      .doc("cart")
      .set({
        totalPrice: price,
        basket: JSON.stringify(newcart),
      })
      .then(() => {
        console.log("Document successfully updated!");
      })
      .catch((error) => {
        // The document probably doesn't exist.
        console.error("Error updating document: ", error);
      });
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

  // handling cart------------------------------------------------
  useEffect(() => {
    if (!user) {
      setCart([]);
    } else {
      const rute = db
        .collection("users")
        .doc(user?.uid)
        .collection("cart")
        .doc("cart");
        rute
          .get()
          .then((doc) => {
            const data = doc.data();
            const basket = JSON.parse(data.basket);
            const price = data.totalPrice;
            console.log(basket);
            console.log(price);
            setCart(basket);
            setTotalPrice(price);
            // updateToDB([...cart, ...basket], price + totalPrice);
          })
          .catch((error) => {
            console.log("Error getting document:", error);
          });
    }
  }, [user]);
  return (
    <Router>
      <div className="App">
        <div className="Navbar">
          <Navbar
            cart={cart}
            user={user}
            setCart={setCart}
            setUser={setUser}
            setTotalPrice={setTotalPrice}
            updateToDB={updateToDB}
          />
        </div>
        
        <Switch>
          <Route path="/orders&returns">
            <div className="ordr">
              <Orders
                loading={loading}
                setLoading={setLoading}
                user={user}
                orders={orders}
                setOrders={setOrders}
              />
            </div>
          </Route>
          <Route path="/" exact>
            <div className="Categories">
              <Categories />
            </div>
            <div className="banner">
              <img
                src="https://www.webpaceindia.com/images/ecommerce-banner.png"
                alt=""
              />
            </div>
            <Body
              loading={loading}
              setLoading={setLoading}
              path=""
              handleCart={addToCart}
            />
          </Route>
          <Route path="/electronics">
            <div className="Categories">
              <Categories />
            </div>
            <div className="banner">
              <img
                src="https://demoopc.aeipix.com/AX01/shopnia17/demo2/image/cache/catalog/Main-Banner-2-1903x780.jpg"
                alt=""
              />
            </div>
            <Body
              loading={loading}
              setLoading={setLoading}
              path="/category/electronics"
              handleCart={addToCart}
            />
          </Route>
          <Route path="/jewelery">
            <div className="Categories">
              <Categories />
            </div>
            <div className="banner">
              <img
                src="https://mir-s3-cdn-cf.behance.net/project_modules/fs/15b5a866565959.5b1a0b70ac010.jpg"
                alt=""
              />
            </div>
            <Body
              loading={loading}
              setLoading={setLoading}
              path="/category/jewelery"
              handleCart={addToCart}
            />
          </Route>
          <Route path="/men-clothing">
            <div className="Categories">
              <Categories />
            </div>
            <div className="banner">
              <img
                src="https://www.muscatgrandmall.com/media/2437/men-fashion.jpg?anchor=center&mode=crop&width=1600&height=600&rnd=132032467470000000"
                alt=""
              />
            </div>
            <Body
              loading={loading}
              setLoading={setLoading}
              path="/category/men clothing"
              handleCart={addToCart}
            />
          </Route>
          <Route path="/women-clothing">
            <div className="Categories">
              <Categories />
            </div>
            <div className="banner">
              <img
                src="https://www.masonkart.com/pub/media/catalog/category/BB-Hm-Pg-Hero-Banner-NOV19-1800x693.jpg"
                alt=""
              />
            </div>
            <Body
              loading={loading}
              setLoading={setLoading}
              path="/category/women clothing"
              handleCart={addToCart}
            />
          </Route>
          <Route path="/cart">
            <div className="Cart">
              <Cart
                user={user}
                items={cart}
                handleRemove={handleRemove}
                totalPrice={totalPrice}
                setCart={setCart}
                setTotalPrice={setTotalPrice}
                updateToDB={updateToDB}
              />
            </div>
          </Route>
        </Switch>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
