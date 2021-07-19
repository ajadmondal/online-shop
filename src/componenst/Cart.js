import React, {useContext} from 'react';
import { userContext, cartContext } from '../Store';
import "./Cart.css";
import CartItem from "./CartItem";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import { Link } from "react-router-dom";
import { db } from '../firebase';
import { v4 as uuidv4 } from "uuid";
import { useHistory } from 'react-router-dom';

export default function Cart(props) {
  const [user, setUser] = useContext(userContext);
  const [items, setCart] = useContext(cartContext);
  const history = useHistory();

  
  // Placing the order to DB
  const checkout = () => {
    if (!user) {
      alert("Please Sign In to Proceed.");
    }
    //upload the order details
    else {
      const d = new Date();
      const id = uuidv4();

      db.collection("users")
        .doc(user?.uid)
        .collection("orders")
        .doc(id)
        .set({
          id: id,
          status: "Processing..",
          amount: props.totalPrice,
          date: d,
          basket: JSON.stringify(items),
        })
        .then(() => {
          history.push("/orders&returns");
          setCart([]);
          props.setTotalPrice(0);
          props.updateCartToDB([], 0);
        });
    }
  };

  //Redirect to Home page if cart is empty
  const redirect = () => {
    history.push("/");
  };


  return (
    <div>
      {items.length === 0 ? (
        <div className="cart-empty-container">
          <div className="cart-empty" onClick={redirect}>
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
            {items.map((item) => (
              <CartItem
                key={item.id}
                image={item.image}
                title={item.title}
                description={item.description}
                price={item.price}
                handleRemove={props.handleRemove}
                cart={true}
              />
            ))}
          </div>
          
            <div className="cart-container-total">
              <div className="cart-total">
                <p>
                  Subtotal ( {items.length} items )
                  <i>
                    <small> $ </small>
                    <strong>{props.totalPrice}</strong>
                  </i>
                </p>
                <button onClick={checkout}>Proceed to Checkout</button>
              </div>
            </div>
          {/* )} */}
        </div>
      )}
    </div>
  );
  // );
}
