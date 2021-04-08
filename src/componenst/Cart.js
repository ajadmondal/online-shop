import React from 'react'
import "./Cart.css";
import Item from "./Item";
export default function Cart(props) {
    return (
      <div>
        {props.items.map((item) => (
          <Item
            key={item.id}
            image={item.image}
            title={item.title}
            description={item.description}
            price={item.price}
            handleCart={props.handleCart}
          />
        ))}
      </div>
    );
}
