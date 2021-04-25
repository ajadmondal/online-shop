import React from 'react';
import './CartItem.css';

export default function CartItem(props) {
    const handleClick = () => {
      props.handleRemove(props.title);
    };
    return (
      <div className="cart-item-container">
        <div className="cart-item-image-container">
          <img src={props.image} alt="Product Image" />
        </div>

        <div className="cart-item-bottom-container">
          <h3 className="h3">{props.title}</h3>
          <p>{props.description}</p>
          <div className="cart-item-price">
            <i>
              <small>$</small> <strong>{props.price}</strong>
            </i>
            {
              props.cart ? <button onClick={handleClick}>Remove</button>: null
            }
          </div>
        </div>
      </div>
    );
}
