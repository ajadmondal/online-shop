import React, {useState, useEffect, useContext} from 'react';
import './App.css';
import { userContext, cartContext, OrdersProvider, ProductsProvider} from './Store';
import Body from "./componenst/Body";
import Navbar from './componenst/Navbar';
import Footer from "./componenst/Footer";
import Categories from './componenst/Categories';
import Cart from './componenst/Cart';
import Orders from "./componenst/Orders";
import { auth, db } from "./firebase";
import {BrowserRouter as Router, Route, Switch} from  'react-router-dom';
function App() {
  const [cart, setCart] = useContext(cartContext);
  const [totalPrice, setTotalPrice] = useState(0);
  const [user, setUser] = useContext(userContext);

  // Removing items from Cart
  const handleRemove = (title) => {
    let i = 0;
    for (; i < cart.length; i++) {
      if (cart[i].title === title) break;
    }
    if (i > -1) {
      const price = Number(Number(totalPrice) - Number(cart[i].price)).toFixed(
        2
      );
      setTotalPrice(price);
      cart.splice(i, 1);
      setCart(cart);
      if (user) updateCartToDB(cart, price);
    }
  };

  // Adding items to Cart
  const addToCart = (e) => {
    const newcart = [...cart, e];
    setCart(newcart);
    const price = Number(Number(totalPrice) + Number(e.price)).toFixed(2);
    setTotalPrice(price);
    if (user) updateCartToDB(newcart, price);
  };

  // Uploading the Cart to DB
  const updateCartToDB = (newcart, price) => {
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
  };

  //Getting the User
  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        setUser(authUser);
      } else {
        setUser(null);
      }
    });
  }, [user]);

  // Loadling Cart------------------------------------------------
  useEffect(() => {
    if (!user) {
      setCart([]);
    } else {
        db
          .collection("users")
          .doc(user?.uid)
          .collection("cart")
          .doc("cart")
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
            setTotalPrice={setTotalPrice}
            updateCartToDB={updateCartToDB}
          />
        </div>

        <Switch>
          <Route path="/orders&returns">
            <div className="ordr">
              <OrdersProvider>
                <Orders user={user} />
              </OrdersProvider>
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
            <ProductsProvider>
              <Body path="" handleCart={addToCart} />
            </ProductsProvider>
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
            <ProductsProvider>
              <Body path="/category/electronics" handleCart={addToCart} />
            </ProductsProvider>
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
            <ProductsProvider>
              <Body path="/category/jewelery" handleCart={addToCart} />
            </ProductsProvider>
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
            <ProductsProvider>
              <Body path="/category/men clothing" handleCart={addToCart} />
            </ProductsProvider>
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
            <ProductsProvider>
              <Body path="/category/women clothing" handleCart={addToCart} />
            </ProductsProvider>
          </Route>
          <Route path="/cart">
            <div className="Cart">
              <Cart
                handleRemove={handleRemove}
                totalPrice={totalPrice}
                setTotalPrice={setTotalPrice}
                updateCartToDB={updateCartToDB}
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
