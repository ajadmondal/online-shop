import React from 'react'
import "./Categories.css";
import { Link } from 'react-router-dom';
export default function Categories() {
    return (
      <div className="categories">
        <Link to="/electronics" className="link">
          <p className="category">Electronics</p>
        </Link>
        <Link to="/jewelery" className="link">
          <p className="category">Jewelery</p>
        </Link>
        <Link to="/men-clothing" className="link">
          <p className="category">Men clothing</p>
        </Link>
        <Link to="/women-clothing" className="link">
          <p className="category">Women clothing</p>
        </Link>
      </div>
    );
}
