import React from 'react'
import StorefrontIcon from '@material-ui/icons/Storefront';
import SearchIcon from '@material-ui/icons/Search';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import './Navbar.css';
import NavItem from './NavItem';
import { Link, useHistory } from 'react-router-dom';
import firebase from "firebase/app";
import { auth } from "../firebase";
export default function Navbar(props) {
  const history = useHistory();
  const provider = new firebase.auth.GoogleAuthProvider();
  // const [logdIn, setlogdIn] = useState(false);
  const signInOut = () => {
    !props.user
      ? auth
          .signInWithPopup(provider)
          .then((auth) => {
            history.push("/");
          })
          .catch((error) => alert(error.message))
      : auth.signOut().catch((error) => alert(error.message));
  };
    return (
      <nav>
        <div>
          <Link className="link" to="/">
            <i>
              <StorefrontIcon />
              Shop
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
            <Link className="link" onClick={signInOut} >
              {
              props.user ?
               <NavItem span={props.user.displayName} text="Log out" /> :
               <NavItem span="Hello Guest" text="Sign In" />
              
              }
             
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
              <ShoppingCartIcon />
              <span>{props.cart.length}</span>
            </Link>
          </li>
        </ul>
      </nav>
    );
}
