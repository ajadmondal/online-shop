import React, {useState, createContext} from 'react';

//cart context definition ------------------------------------
export const cartContext = createContext();
export const CartProvider = props => {
    const [cart, setCart] = useState([]);
    return (
        <cartContext.Provider value = {[cart, setCart]}>
            {props.children}
        </cartContext.Provider>
    )
}

//user context definition ------------------------------------
export const userContext = createContext();
export const UserProvider = (props) => {
  const [user, setUser] = useState(null);
  return (
    <userContext.Provider value={[user, setUser]}>
      {props.children}
    </userContext.Provider>
  );
}

//orders context definition ------------------------------------
export const ordersContext = createContext();
export const OrdersProvider = (props) => {
  const [orders, setOrders] = useState([]);
  return (
    <ordersContext.Provider value={[orders, setOrders]}>
      {props.children}
    </ordersContext.Provider>
  );
};

//products context definition ------------------------------------
export const productsContext = createContext();
export const ProductsProvider = (props) => {
  const [products, setProducts] = useState([]);
  return (
    <productsContext.Provider value={[products, setProducts]}>
      {props.children}
    </productsContext.Provider>
  );
};