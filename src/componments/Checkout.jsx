import { createContext, useContext, useEffect, useState } from "react";

import { CartContext } from "../contexts/CartContext";

function Checkout() {
  let { cartItems, setCartItems } = useContext(CartContext);

  let { setCount } = useContext(CartContext);

  // Calculate totals
  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const shipping = 0; // Free shipping
  const tax = 0; // No tax for now
  const total = subtotal + shipping + tax;

  // Quantity control functions
  const increaseQuantity = (productId) => {
    let items = cartItems.map((item) => {
      if (item.id === productId) {
        return {
          ...item,
          quantity: item.quantity + 1,
        };
      }
      return item;
    });

    setCartItems(items);
    localStorage.setItem("cartItems", JSON.stringify(items));
  };

  const decreaseQuantity = (productId) => {
    let items = cartItems.map((item) => {
      if (item.id === productId && item.quantity > 1) {
        return {
          ...item,
          quantity: item.quantity - 1,
        };
      }
      return item;
    });

    setCartItems(items);
    localStorage.setItem("cartItems", JSON.stringify(items));
  };

  let orderItems = () => {
    let orderItems = localStorage.getItem("cartItems");

    if (orderItems) {
      let orders = JSON.parse(orderItems);
      setCartItems(orders);
    }
  };

  let removeItem = (remove_item) => {
    let newCartIems = cartItems.filter((item) => item.id != remove_item.id);

    setCartItems(newCartIems);
    localStorage.setItem("cartItems", JSON.stringify(newCartIems));

    const total = newCartIems.reduce(
      (accumulator, currentValue) => accumulator + currentValue.quantity,
      0
    );
    setCount(total);

    return;
  };
  useEffect(() => {
    orderItems();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Secure Checkout
          </h1>
          <p className="text-gray-600">
            Review your items and complete your purchase
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-semibold text-gray-800">
                  Shopping Cart
                </h2>
                <span className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm font-medium">
                  {cartItems.length} items
                </span>
              </div>

              <div className="space-y-6">
                {cartItems.map((item, index) => (
                  <div
                    key={`${item.id}-${index}`}
                    className="flex items-center space-x-6 p-6 bg-gray-50 rounded-xl border border-gray-200 hover:shadow-md transition-all duration-300"
                  >
                    {/* Product Image */}
                    <div className="w-24 h-24 bg-gray-200 rounded-xl flex-shrink-0 overflow-hidden shadow-sm">
                      <img
                        src={
                          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnpjDvjhef5pAzuvGqklGQa2ZVoVliAiaeQg&s"
                        }
                        alt={item.title}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.src =
                            "https://via.placeholder.com/150x150?text=No+Image";
                        }}
                      />
                    </div>

                    {/* Product Details */}
                    <div className="flex-grow">
                      <h3 className="text-xl font-semibold text-gray-800 mb-1">
                        {item.title}
                      </h3>
                      <p className="text-gray-600 mb-3">{item.name}</p>

                      {/* Quantity Controls */}
                      <div className="flex items-center space-x-4">
                        <span className="text-gray-700 font-medium">
                          Quantity:
                        </span>
                        <div className="flex items-center bg-white rounded-lg border border-gray-300 shadow-sm">
                          <button
                            onClick={() => decreaseQuantity(item.id)}
                            className="w-10 h-10 text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 font-bold rounded-l-lg transition-all duration-200 flex items-center justify-center"
                          >
                            −
                          </button>
                          <span className="px-4 py-2 text-gray-800 font-semibold min-w-[3rem] text-center bg-gray-50">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => increaseQuantity(item.id)}
                            className="w-10 h-10 text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 font-bold rounded-r-lg transition-all duration-200 flex items-center justify-center"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Item Total & Actions */}
                    <div className="text-right space-y-3">
                      <p className="text-2xl font-bold text-gray-800">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                      <button
                        onClick={() => removeItem(item)}
                        className="inline-flex items-center px-4 py-2 text-sm font-medium text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-colors duration-200 border border-red-200"
                      >
                        <svg
                          className="w-4 h-4 mr-2"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          />
                        </svg>
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-xl p-8 sticky top-6 border border-gray-100">
              <h2 className="text-2xl font-semibold text-gray-800 mb-8">
                Order Summary
              </h2>

              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="text-gray-800 font-medium">
                    ${subtotal.toFixed(2)}
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Shipping</span>
                  <span className="text-green-600 font-medium">Free</span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Tax</span>
                  <span className="text-gray-800 font-medium">
                    ${tax.toFixed(2)}
                  </span>
                </div>

                <hr className="border-gray-200" />

                <div className="flex justify-between items-center text-xl font-bold">
                  <span className="text-gray-800">Total</span>
                  <span className="text-indigo-600">${total.toFixed(2)}</span>
                </div>
              </div>

              <button className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold py-4 px-6 rounded-xl mt-8 transition-all duration-300 transform hover:scale-105 shadow-lg">
                Complete Purchase
              </button>

              <div className="mt-6 flex items-center justify-center space-x-2 text-sm text-gray-500">
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>Secure checkout with SSL encryption</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
