import React, { useState, useEffect, useContext } from 'react';
import { ordersContext } from '../Store';
import './Orders.css';
import { db } from "../firebase";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import { Link, useHistory } from "react-router-dom";
import CartItem from "./CartItem";
import Loader from "react-loader-spinner";
import { v4 as uuidv4 } from "uuid";

const Order = ({ order, pay, returnItem }) => {
  return (
    <>
      <div>
        <p>
          Subtotal ( {order.basket.length} items )
          <i>
            <small> $ </small>
            <strong>{order.amount}</strong>
          </i>
        </p>
      </div>
      <h6>{new Date(order.date.seconds * 1000).toDateString()}</h6>
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
            <button className="button pay" onClick={() => pay(order)}>
              Pay Now
            </button>
          )}

          <button className="button return" onClick={() => returnItem(order)}>
            Return
          </button>
        </div>
      )}
    </>
  </>
  )
  
};

const Orders = ({ user }) => {
  const [changed, setChanged] = useState(true);
  const [loading, setLoading] = useState(false);
  const [orders, setOrders] = useContext(ordersContext);
  const history = useHistory();


  // reloding the orders every time the user changes or any data in order changes---------
  useEffect(() => {
    setLoading(true);
    if (!user) {
      setOrders([]);
      setLoading(false);
    } else {
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
          setOrders(newOrder);
        })
        .then(() => setLoading(false))
        .catch((error) => {
          alert("Error getting documents please refresh the page: ", error);
        });
    }
  }, [user, changed]);

  // update any perticular order changes to database --------------
  const sendChangedOrderToDB = (order) => {
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
    // changed is set to relode the orders from the db ----------------
    setChanged(!changed);
  };

  // order status changes to Paid------
  const pay = (order) => {
    setLoading(true);
    order.status = "Paid.";
    sendChangedOrderToDB(order);
    
  };

  // order status changes to Returned------
  const returnItem = (order) => {
    setLoading(true);
    order.status = "Order Returned.";
    sendChangedOrderToDB(order);
  };
  
  // redirect to home page if the order list is empty ----
  const redirect = () => {
    history.push("/");
  };
  // order component ---------------------------------
  

  return (
    <>
      {loading ? (
        <div className="ldr">
          <Loader
            type="Grid"
            color="rgb(238, 155, 60)"
            height={100}
            width={90}
            // timeout={3000} //3 secs
          />
        </div>
      ) : (
        <div className="orders__container">
          {orders.length === 0 ? (
            <div className="empty__container">
              <div className="empty__order" onClick={redirect}>
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
              <h2 className="order__heading">Your Orders & Returns</h2>
              <>
                {orders.map((order) => (
                  <>
                    {order.status === "Order Returned." ? (
                      <div className="order__container dim">
                        <Order
                          order={order}
                          pay={pay}
                          returnItem={returnItem}
                        />
                      </div>
                    ) : (
                      <div className="order__container">
                        <Order
                          order={order}
                          pay={pay}
                          returnItem={returnItem}
                        />
                      </div>
                    )}
                  </>
                ))}
              </>
            </>
          )}
        </div>
      )}
    </>
  );
}
export default Orders;
