import React from 'react'
import StorefrontIcon from '@material-ui/icons/Storefront';
import SearchIcon from '@material-ui/icons/Search';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import './Navbar.css';
import NavItem from './NavItem';
export default function Navbar() {
    return (
        <nav>
            <div>
                <i><StorefrontIcon/>Shop</i>
                <form action="">
                    <input type="text"/>
                    <i><SearchIcon/></i>
                </form>
            </div>
            
            <ul>
                <li className = "nav-item">
                <NavItem  span = "Hello" text = "Log In"/>
                </li>
                <li className = "nav-item">
                <NavItem  span = "Return &" text = "Orders"/>
                </li>
                <li className = "nav-item">
                <NavItem  span = "Your" text = "Premium"/>
                </li>
                <li>
                    <ShoppingCartIcon/>
                    <span>0</span>
                </li>
            </ul>
            
        </nav>
    )
}
