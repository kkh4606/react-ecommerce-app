import { createContext } from "react";
import { useState } from "react";
import { useEffect } from "react";
let CardContext = createContext();

let CartContextProvider = ({ children }) => {
  const [products, setProducts] = useState([]);

  let getProducts = async () => {
    await fetch("http://localhost:9000/api/products")
      .then((response) => response.json())
      .then((data) => {
        setProducts(data.products);
      });
  };

  let getProductDetail = async () => {
    try {
      const response = await fetch(`http://localhost:9000/api/products/${id}`);

      if (response.status === 404) {
        navigate("*");
        return;
      }

      const data = await response.json();
      setProduct(data.product);
    } catch (error) {
      console.error("Error fetching product:", error);
      navigate("*");
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  return <CardContext value={{ products }}>{children}</CardContext>;
};

export { CardContext, CartContextProvider };
