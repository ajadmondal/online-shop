import React, {useState, useEffect} from 'react';
import './Orders.css';
import { db } from "../firebase";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import { Link } from "react-router-dom";
import CartItem from "./CartItem";
import { v4 as uuidv4 } from "uuid";
import { BorderColor } from '@material-ui/icons';
const Orders = (props) => {
  const [changed, setChanged] = useState(true);
    const user = props.user;
    const orders = props.orders;
  useEffect(() => {
    if (!user) {
      props.setOrders([]);
    }
    else {
      db.collection("users")
        .doc(user?.uid)
        .collection("orders")
        .orderBy("date", "desc")
        .get()
        .then((querySnapshot) => {
          const newOrder = [];
          querySnapshot.forEach((doc) => {
            const data = doc.data();
            data.basket = JSON.parse(data.basket);
            newOrder.push(data);
          });
          props.setOrders(newOrder);
          console.log(orders)
        })
        .catch((error) => {
          console.log("Error getting documents: ", error);
        });
    }
        
  }, [user, changed]);
  const pay = (order) => {
    order.status = "Paid.";
    db.collection("users")
      .doc(user?.uid)
      .collection("orders")
      .doc(order.id)
      .set({
        id: order.id,
        status: order.status,
        amount: order.amount,
        date: order.date,
        basket: JSON.stringify(order.basket),
      });
    setChanged(!changed);
  }
  const returnItem = (order) => {
    order.status = "Order Returned.";
    db.collection("users")
      .doc(user?.uid)
      .collection("orders")
      .doc(order.id)
      .set({
        id: order.id,
        status: order.status,
        amount: order.amount,
        date: order.date,
        basket: JSON.stringify(order.basket),
      });
    setChanged(!changed);
  };
  return (
    <div className="orders__container">
      {orders.length === 0 ? (
        <div className="empty__container">
          <div className="empty__order">
            <h3>You have not ordered yet!</h3>
            <Link className="link" to="/">
              <h5>Continue Shopping</h5>
              {/* <i> */}
              <AddShoppingCartIcon fontSize="large" />
              {/* </i> */}
            </Link>
          </div>
        </div>
      ) : (
        <>
          <h4 className="order__heading">Your Orders & Returns</h4>
          <>
            {orders.map((order) => (
              <>
                {order.status === "Order Returned." ? (
                  <div className="order__container dim">
                    <div>
                      <p>
                        Subtotal ( {order.basket.length} items )
                        <i>
                          <small> $ </small>
                          <strong>{order.amount}</strong>
                        </i>
                      </p>
                    </div>
                    <h6>
                      {new Date(order.date.seconds * 1000).toDateString()}
                    </h6>
                    <h5>Status : {order.status}</h5>
                    <h5>Order Id: {order.id}</h5>

                    {order.basket.map((item) => (
                      <CartItem
                        key={uuidv4()}
                        image={item.image}
                        title={item.title}
                        price={item.price}
                        cart={false}
                      />
                    ))}
                    <>
                      {order.status === "Order Returned." ? null : (
                        <div className="order__pay">
                          {order.status === "Paid." ? null : (
                            <button
                              className="button pay"
                              onClick={() => pay(order)}
                            >
                              Pay Now
                            </button>
                          )}

                          <button
                            className="button return"
                            onClick={() => returnItem(order)}
                          >
                            Return
                          </button>
                        </div>
                      )}
                    </>
                  </div>
                ) : (
                  <div className="order__container">
                    <div>
                      <p>
                        Subtotal ( {order.basket.length} items )
                        <i>
                          <small> $ </small>
                          <strong>{order.amount}</strong>
                        </i>
                      </p>
                    </div>
                    <h6>
                      {new Date(order.date.seconds * 1000).toDateString()}
                    </h6>
                    <h5>Status : {order.status}</h5>
                    <h5>Order Id: {order.id}</h5>

                    {order.basket.map((item) => (
                      <CartItem
                        key={uuidv4()}
                        image={item.image}
                        title={item.title}
                        price={item.price}
                        cart={false}
                      />
                    ))}
                    <>
                      {order.status === "Order Returned." ? null : (
                        <div className="order__pay">
                          {order.status === "Paid." ? null : (
                            <button
                              className="button pay"
                              onClick={() => pay(order)}
                            >
                              Pay Now
                            </button>
                          )}

                          <button
                            className="button return"
                            onClick={() => returnItem(order)}
                          >
                            Return
                          </button>
                        </div>
                      )}
                    </>
                  </div>
                )}
              </>
            ))}
          </>
        </>
      )}
    </div>
  );
}
export default Orders;
