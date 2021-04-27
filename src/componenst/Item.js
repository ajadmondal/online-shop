import React from 'react'
import "./Item.css";
export default function Item(props) {
    return (
        <div className="container">
            <div className="image-container">
                <img src={props.image} alt="Product Snap"/>
            </div>
            
            <div className="bottom-container">
               <h3>{props.title}</h3>
               {/* <p>{props.description}</p> */}
               <div className="price">
                    <i><small>$</small> <strong>{props.price}</strong></i>
                    <button onClick = { () => props.handleCart(props)}>Add to cart</button>
               </div>
            </div>
        </div>
    )
}
