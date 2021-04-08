import React, {useState, useEffect} from 'react'
import "./Home.css";
import Item from "./Item";
export default function Home(props) {
    const [items, setItems] = useState([]);
    useEffect(() => {
        fetch('https://fakestoreapi.com/products')
            .then(res=>res.json())
            .then(json => setItems(json));
        // console.log(items);
    },[]);
    return (
        <div className="home-container">
            {items.map(item => (
                <Item
                key = {item.id}
                image = {item.image}
                title = {item.title}
                description = {item.description}
                price = {item.price}
                handleCart = {props.handleCart}
                />
            ))}
        </div>
    )
}
