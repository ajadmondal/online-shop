import React, {useState, useEffect} from 'react'
import "./Body.css";
import Item from "./Item";
import Loader from "react-loader-spinner";
export default function Body({ path, handleCart }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);

  //loading the products by API call
  useEffect(() => {
    setLoading(true);
    fetch(`https://fakestoreapi.com/products${path}`)
      .then((res) => res.json())
      .then((json) => setItems(json))
      .then(() => setLoading(false));
    // console.log(items);
  }, [path]);
  
  
  return (
    <div className="body-container">
      {loading ? (
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
              handleCart={handleCart}
            />
          ))}
        </>
      )}
    </div>
  );
}
