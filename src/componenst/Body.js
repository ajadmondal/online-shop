import React, {useState, useEffect} from 'react'
import "./Body.css";
import Item from "./Item";
import Loader from "react-loader-spinner";
export default function Body(props) {
    const [items, setItems] = useState([]);
    useEffect(() => {
      props.setLoading(true);
      fetch(`https://fakestoreapi.com/products${props.path}`)
        .then((res) => res.json())
        .then((json) => setItems(json))
        .then(() => props.setLoading(false));
      // console.log(items);
    }, [props.path]);
  return (
    <div className="home-container">
      {props.loading ? (
        <div className="loader">
          <Loader
            type="Grid"
            color="rgb(238, 155, 60)"
            height={100}
            width={100}
            // timeout={3000} //3 secs
          />
        </div>
      ) : (
        <>
          {items.map((item) => (
            <Item
              key={item.id}
              image={item.image}
              title={item.title}
              description={item.description}
              price={item.price}
              handleCart={props.handleCart}
            />
          ))}
        </>
      )}
    </div>
  );
}
