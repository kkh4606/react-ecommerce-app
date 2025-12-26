import { createContext, useMemo } from "react";
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

  let total = useMemo(() => {
    const savedCart = localStorage.getItem("cartItems");

    if (!savedCart) return 0;
    if (savedCart) {
      let items = JSON.parse(savedCart);

      let totals = 0;

      for (let item of items) {
        totals += item.quantity;
      }

      return totals;
    }
  }, [cartItems]);

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <CartContext.Provider
      value={{
        products,
        cartItems,
        setCartItems,
        count,
        setCount,
        total,
        getProducts,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export { CartContext, CartContextProvider };
