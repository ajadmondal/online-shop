import React from 'react'
import "./Cart.css";
import CartItem from "./CartItem";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import { BrowserRouter as Router, Link, Route} from "react-router-dom";
export default function Cart(props) {
  return (
    <div>
      {props.items.length === 0 ? (
        <div className="cart-empty-container">
          <div className="cart-empty">
            <h3>Your cart is empty!</h3>
            <Link className="link" to="">
              <h5>Continue Shopping</h5>
              {/* <i> */}
              <AddShoppingCartIcon fontSize="large" />
              {/* </i> */}
            </Link>
          </div>
        </div>
      ) : (
        <div className="cart-container">
          <div className="cart-container-items">
            {props.items.map((item) => (
              <CartItem
                key={item.id}
                image={item.image}
                title={item.title}
                description={item.description}
                price={item.price}
                handleRemove={props.handleRemove}
              />
            ))}
          </div>
          {props.items.length === 0 ? (
            <div className="cart-empty-container">
              <div className="cart-empty">
                <h3>Your cart is empty!</h3>
                <Link className="link" to="">
                  <h5>Continue Shopping</h5>
                  {/* <i> */}
                  <AddShoppingCartIcon fontSize="large" />
                  {/* </i> */}
                </Link>
              </div>
            </div>
          ) : (
            <div className="cart-container-total">
              <div className="cart-total">
                <p>
                  Subtotal ( {props.items.length} items )
                  <i>
                    <small> $ </small>
                    <strong>{props.totalPrice}</strong>
                  </i>
                </p>
                <button>Proceed to Checkout</button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
  // );
}
