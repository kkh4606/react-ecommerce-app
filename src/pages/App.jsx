import { useContext, useEffect, useState } from "react";
import ProductCard from "../componments/ProductCard";
import { CartContext } from "../contexts/CartContext";

function App() {
  let { products } = useContext(CartContext);
  if (products.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* <NavBar filterProductsBySearch={filterProductsBySearch} /> */}
      <div className="py-8">
        <div className="container mx-auto px-4">
          <ProductCard products={products} />
        </div>
      </div>
    </div>
  );
}

export default App;
