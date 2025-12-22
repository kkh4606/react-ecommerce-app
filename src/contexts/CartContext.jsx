import { createContext } from "react";
import { useEffect, useState } from "react";

let CartContext = createContext();

let CartContextProvider = ({ children }) => {
  // get all productss
  const [products, setProducts] = useState([]);

  let [count, setCount] = useState(0);

  // fetch all products data
  let getProducts = async () => {
    await fetch("http://localhost:9000/api/products")
      .then((response) => response.json())
      .then((data) => {
        setProducts(data.products);
      });
  };

  const [cartItems, setCartItems] = useState([]);

  let getItems = () => {
    const savedCart = localStorage.getItem("cartItems");
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));

      let items = JSON.parse(savedCart);

      let totals = 0;

      for (let item of items) {
        totals += item.quantity;
      }

      setCount(totals);
    }
  };

  useEffect(() => {
    getItems();
  }, [count]);

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <CartContext.Provider
      value={{ products, cartItems, setCartItems, count, setCount }}
    >
      {children}
    </CartContext.Provider>
  );
};

export { CartContext, CartContextProvider };
