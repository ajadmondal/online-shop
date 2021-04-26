import React from 'react'
import StorefrontIcon from '@material-ui/icons/Storefront';
import SearchIcon from '@material-ui/icons/Search';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import './Navbar.css';
import NavItem from './NavItem';
import { Link } from 'react-router-dom';
import firebase from "firebase/app";
import { auth } from "../firebase";
export default function Navbar(props) {
  const provider = new firebase.auth.GoogleAuthProvider();
  const signInOut = () => {
    !props.user
      ? auth
        .signInWithPopup(provider)
        .then(() => {
          // const rute = db
          //   .collection("users")
          //   .doc(props.user?.uid)
          //   .collection("cart")
          //   .doc("cart");
          // rute.get().then((doc) => {
          //   const data = doc.data();
          //   const basket = JSON.parse(data.basket);
          //   const price = data.totalPrice;
          //   console.log(basket);
          //   console.log(price);
          //   props.setCart([...props.cart, ...basket]);
          //   props.setTotalPrice(price + props.totalPrice);
          //   props.updateToDB(
          //     [...props.cart, ...basket],
          //     price + props.totalPrice
          //   );
        // });
        })
          .catch((error) => alert(error.message))
      : auth.signOut()
        .then(() => {
          props.setUser(null);
          props.setCart([]);
          props.setTotalPrice(0);
        })
        .catch((error) => alert(error.message));
  };
    return (
      <nav>
        <div>
          <Link className="link" to="/">
            <i>
              <StorefrontIcon />
              ShopX
            </i>
          </Link>

          <form className="form" action="">
            <input className="input" type="text" placeholder="Search" />
            <i>
              <SearchIcon />
            </i>
          </form>
        </div>

        <ul>
          <li className="nav-item">
            <Link className="link" onClick={signInOut}>
              {props.user ? (
                <NavItem span={props.user.displayName} text="Log out" />
              ) : (
                <NavItem span="Hello Guest" text="Sign In" />
              )}
            </Link>
          </li>
          <li className="nav-item">
            <Link className="link" to="/orders&returns">
              <NavItem span="Return &" text="Orders" />
            </Link>
          </li>
          <li className="nav-item">
            <Link className="link">
              <NavItem span="Your" text="Premium" />
            </Link>
          </li>
          <li>
            <Link className="link" to="/cart">
              <p className="cart-icon">
                <ShoppingCartIcon />{props.cart.length}
              </p>
            </Link>
          </li>
        </ul>
      </nav>
    );
}
