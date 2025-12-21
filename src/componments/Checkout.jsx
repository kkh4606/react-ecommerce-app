import React, { createContext, useContext, useState } from "react";

function Checkout() {
  // Product data state
  const [productData, setProductData] = useState({
    id: 1,
    title: "Sample Product",
    quantity: 2,
    price: 99.99,
    image: "url",
  });

  let { products } = useContext(createContext);

  const itemTotal = productData.price * productData.quantity;

  // Quantity control functions
  const increaseQuantity = () => {
    setProductData((prev) => ({
      ...prev,
      quantity: prev.quantity + 1,
    }));
  };

  const decreaseQuantity = () => {
    setProductData((prev) => ({
      ...prev,
      quantity: Math.max(1, prev.quantity - 1),
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          Checkout
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">
                Your Cart
              </h2>

              <div className="flex items-center space-x-4 border-b border-gray-200 pb-4 mb-4 last:border-b-0 last:pb-0 last:mb-0">
                {/* Product Image */}
                <div className="w-20 h-20 bg-gray-200 rounded-lg flex-shrink-0 overflow-hidden">
                  <img
                    src={
                      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSaanNHkH2UQYCzyN0i-jO3g2Ct_4I-KsWylQ&s"
                    }
                    alt={productData.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Product Details */}
                <div className="flex-grow">
                  <h3 className="text-lg font-medium text-gray-900">
                    {productData.title}
                  </h3>

                  {/* Quantity Controls */}
                  <div className="flex items-center space-x-3 mb-2">
                    <span className="text-gray-600 text-sm">Quantity:</span>
                    <div className="flex items-center bg-gray-100 rounded-lg">
                      <button
                        onClick={decreaseQuantity}
                        className="w-8 h-8 bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold rounded-l-lg transition-colors duration-200 flex items-center justify-center"
                      >
                        -
                      </button>
                      <span className="px-3 py-1 text-gray-900 font-medium min-w-[3rem] text-center">
                        {productData.quantity}
                      </span>
                      <button
                        onClick={increaseQuantity}
                        className="w-8 h-8 bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold rounded-r-lg transition-colors duration-200 flex items-center justify-center"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <p className="text-gray-600">
                    Price: ${productData.price.toFixed(2)}
                  </p>
                </div>

                {/* Item Total */}
                <div className="text-right">
                  <p className="text-lg font-semibold text-gray-900">
                    ${itemTotal.toFixed(2)}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">
                Order Summary
              </h2>

              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="text-gray-900">${itemTotal.toFixed(2)}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="text-gray-900">Free</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-600">Tax</span>
                  <span className="text-gray-900">$0.00</span>
                </div>

                <hr className="my-4" />

                <div className="flex justify-between text-lg font-semibold">
                  <span className="text-gray-900">Total</span>
                  <span className="text-gray-900">${itemTotal.toFixed(2)}</span>
                </div>
              </div>

              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg mt-6 transition duration-200">
                Proceed to Payment
              </button>

              <div className="mt-4 text-center">
                <p className="text-sm text-gray-500">
                  Secure checkout powered by SSL
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
