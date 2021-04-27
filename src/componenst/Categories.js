import React from 'react'
import "./Categories.css";
import { NavLink } from 'react-router-dom';
export default function Categories( ) {
    return (
      <div className="categories">
        <NavLink
          activeClassName="active-link"
          to="/electronics"
          className="category-link"
        >
          <p className="category">Electronics</p>
        </NavLink>
        <NavLink
          activeClassName="active-link"
          to="/jewelery"
          className="category-link"
        >
          <p className="category">Jewelery</p>
        </NavLink>
        <NavLink
          activeClassName="active-link"
          to="/men-clothing"
          className="category-link"
        >
          <p className="category">Men clothing</p>
        </NavLink>
        <NavLink
          activeClassName="active-link"
          to="/women-clothing"
          className="category-link"
        >
          <p className="category">Women clothing</p>
        </NavLink>
      </div>
    );
}
