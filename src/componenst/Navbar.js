import React from 'react'
import StorefrontIcon from '@material-ui/icons/Storefront';
import SearchIcon from '@material-ui/icons/Search';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import './Navbar.css';
import NavItem from './NavItem';
import { Link } from 'react-router-dom';
export default function Navbar(props) {
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
            <Link className="link" to="/signin">
              <NavItem span="Hello" text="Sign In" />
            </Link>
          </li>
          <li className="nav-item">
            <Link className="link" to="/orders&returns">
              <NavItem span="Return &" text="Orders" />
            </Link>
          </li>
          <li className="nav-item">
            <Link className="link" to="/premium">
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
