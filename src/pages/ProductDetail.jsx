import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useContext } from "react";

import { CartContext } from "../contexts/CartContext";

function ProductDetail() {
  let { id } = useParams();
  let [product, setProduct] = useState(null);
  let [quantity, setQuantity] = useState(1);

  let { count, setCount } = useContext(CartContext);
  let navigate = useNavigate();

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
      navigate("*");
    }
  };

  let { cartItems, setCartItems } = useContext(CartContext);

  let addToCart = () => {
    let newItems = {
      ...product,
      quantity,
    };

    let existingitem = cartItems.find((item) => item.id === newItems.id);

    if (existingitem) {
      existingitem.quantity += quantity;
      setCartItems([...cartItems]);

      localStorage.setItem("cartItems", JSON.stringify(cartItems));

      navigate("/checkout");
    } else {
      let updatedItems = [...cartItems, newItems];
      setCartItems(updatedItems);
      localStorage.setItem("cartItems", JSON.stringify(updatedItems));

      navigate("/checkout");
    }

    let orders = JSON.parse(localStorage.getItem("cartItems"));

    const total = orders.reduce(
      (accumulator, currentValue) => accumulator + currentValue.quantity,
      0
    );

    setCount(total);
  };

  useEffect(() => {
    getProductDetail();
  }, [id]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        {product && (
          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
            <div className="md:flex">
              {/* Product Image Section */}
              <div className="md:w-1/2 bg-gradient-to-br from-gray-50 to-gray-100 p-8 flex items-center justify-center">
                <div className="relative w-full max-w-md">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 rounded-2xl transform rotate-3 opacity-20"></div>
                  <div className="relative bg-white rounded-2xl shadow-xl p-6">
                    <img
                      src={
                        "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiHE-qu-vewMygdO0u-WeWYT-X0sWoT0020Wqlx6vQE8B8Q97MNLANzTGq_CYn27uz4qffFiqcuExX953AbySn4s93jvL2zaosu24xj_R1fq1RfzAfJCJ0n91QKEzlbL0hEKvMMc0OVTSQ-/s1600/pes-2018-faces+%252810%2529.jpg"
                      }
                      alt={product.name}
                      className="w-full h-80 object-contain rounded-lg"
                    />
                  </div>
                </div>
              </div>

              {/* Product Details Section */}
              <div className="md:w-1/2 p-8 lg:p-12">
                {/* Category Badge */}
                <div className="mb-6">
                  <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg">
                    <svg
                      className="w-4 h-4 mr-2"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
                    </svg>
                    {product.category?.name || "Uncategorized"}
                  </span>
                </div>

                {/* Product Name */}
                <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                  {product.name}
                </h1>

                {/* Product Description */}
                <p className="text-gray-600 mb-8 text-lg leading-relaxed">
                  {product.description}
                </p>

                {/* Price Section */}
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 mb-8 border border-green-100">
                  <div className="flex items-baseline">
                    <span className="text-5xl lg:text-6xl font-bold text-green-600 mr-3">
                      ${product.price || "0.00"}
                    </span>
                    <span className="text-lg text-gray-500 font-medium">
                      USD
                    </span>
                  </div>
                  <div className="mt-2 flex items-center text-sm text-green-700">
                    <svg
                      className="w-4 h-4 mr-1"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Price includes tax
                  </div>
                </div>

                {/* Quantity Selector */}
                <div className="mb-8">
                  <label className="block text-sm font-semibold text-gray-700 mb-4">
                    Select Quantity
                  </label>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center bg-gray-100 rounded-full p-1">
                      <button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="w-12 h-12 bg-white hover:bg-gray-50 text-gray-700 font-bold rounded-full transition-all duration-200 shadow-sm hover:shadow-md flex items-center justify-center"
                      >
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M20 12H4"
                          />
                        </svg>
                      </button>
                      <div className="px-6 py-3 text-center">
                        <span className="text-2xl font-bold text-gray-900">
                          {quantity}
                        </span>
                      </div>
                      <button
                        onClick={() => setQuantity(quantity + 1)}
                        className="w-12 h-12 bg-white hover:bg-gray-50 text-gray-700 font-bold rounded-full transition-all duration-200 shadow-sm hover:shadow-md flex items-center justify-center"
                      >
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 4v16m8-8H4"
                          />
                        </svg>
                      </button>
                    </div>
                    <div className="text-sm text-gray-600 font-medium">
                      {quantity} item{quantity > 1 ? "s" : ""} selected
                    </div>
                  </div>
                </div>

                {/* Add to Cart Button */}
                <div className="space-y-4">
                  <button
                    onClick={addToCart}
                    className="w-full bg-gradient-to-r from-blue-600 via-blue-700 to-purple-700 hover:from-blue-700 hover:via-blue-800 hover:to-purple-800 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl shadow-lg flex items-center justify-center text-lg"
                  >
                    <svg
                      className="w-6 h-6 mr-3"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.1 5H19M7 13l-1.1 5M7 13h10m0 0v8a2 2 0 01-2 2H9a2 2 0 01-2-2v-8z"
                      />
                    </svg>
                    Add to Cart • ${(product.price || 0) * quantity}
                  </button>

                  <div className="flex items-center justify-center space-x-6 text-sm text-gray-500">
                    <div className="flex items-center">
                      <svg
                        className="w-4 h-4 mr-2 text-green-500"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      Free Shipping
                    </div>
                    <div className="flex items-center">
                      <svg
                        className="w-4 h-4 mr-2 text-blue-500"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      Secure Payment
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductDetail;
